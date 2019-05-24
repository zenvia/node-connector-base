import * as logger from '@zenvia/zcc-logger';
import * as kafkaConsumer from '../kafka/consumer';
import * as kafkaProducer from '../kafka/producer';
import { IMessage } from '../models/message';
import { messageController } from '../controllers';

export function init(): void {
  kafkaConsumer.addListener(messageHandler);
}

async function messageHandler(message: IMessage): Promise<void> {
  logger.debug(`Message [${JSON.stringify(message)}] received`);

  const messageResponse = await messageController.send(message);
  const transactions = await messageController.createTransaction(message, messageResponse);
  await kafkaProducer.sendTransactions(transactions);
}
