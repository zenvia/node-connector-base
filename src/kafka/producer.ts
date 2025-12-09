import * as Bluebird from 'bluebird';
import * as config from 'config';
import { v4 as uuidv4 } from 'uuid';
import logger from '@zenvia/logger';;

import { sendMessage, ProduceRequest, KeyedMessage } from '../kafka';
import { ITransaction, TransactionType } from '../models/transaction';

const kafkaConfig: any = config.get('kafka');

export function sendTransactions(transactions: ITransaction[]): Bluebird<any[]> {
  return Bluebird.map(transactions, transaction => sendTransaction(transaction), { concurrency: 2 });
}

export async function sendTransaction(transaction: ITransaction): Promise<boolean> {
  if (transaction) {
    const key = uuidv4();
    const topic = getTransactionTopic(transaction.type);

    return sendToKafka(key, topic, transaction);
  }
  return false;
}

function getTransactionTopic(transactionType: TransactionType): string {
  let topic: string;

  if (transactionType === TransactionType.MSGEVENT) {
    topic = kafkaConfig.producerTopicHighPriority;
  } else {
    topic = kafkaConfig.producerTopicLowPriority;
  }

  if (!topic) {
    throw new Error('Invalid configuration: transaction topic is not defined');
  }
  return topic;
}

async function sendToKafka(key, topic, transaction, retryCounter = 0): Promise<boolean> {
  const retryMax = kafkaConfig.retry + 1;

  logger.debug(`Sending the transaction [${JSON.stringify(transaction)}] to topic [${topic}] on attempt [${retryCounter}] of [${retryMax}]`);

  const kafkaMessage = buildKafkaMessage(key, topic, transaction);
  const start = Date.now();

  return sendMessage(kafkaMessage)
  .then((result) => {
    const elapsed = Date.now() - start;

    logger.info(`Transaction [${JSON.stringify(transaction)}] sent to topic [${topic}] in [${elapsed}ms]: ${JSON.stringify(result)}`);

    return true;
  })
  .catch((error) => {
    const elapsed = Date.now() - start;
    logger.error(`Fail to send the transaction [${JSON.stringify(transaction)}] to topic [${topic}] in [${elapsed}ms]:`, error);

    if (retryCounter < kafkaConfig.retry) {
      logger.info(`A new attempt to send the transaction [${JSON.stringify(transaction)}] to topic [${topic}] will start in [${kafkaConfig.wait}] seconds`);

      return Bluebird.delay(kafkaConfig.wait)
      .then(() => sendToKafka(key, topic, transaction, retryCounter + 1));
    }

    logger.info(`Maximum number of retries reached: [${retryCounter}]`);
    return false;
  });
}

function buildKafkaMessage(key, topic, transaction): ProduceRequest {
  return {
    topic,
    key,
    attributes: 2,
    messages: [
      new KeyedMessage(key, JSON.stringify(transaction)),
    ],
  };
}
