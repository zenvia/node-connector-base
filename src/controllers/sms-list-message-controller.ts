import * as moment from 'moment';
import * as rp from 'request-promise';
import * as logger from '@zenvia/zcc-logger';

import { IMessageController } from './message-controller';
import { IMessage } from '../models/message';
import { ITransaction, TransactionStatus, TransactionType } from '../models/transaction';

/**
 * Example connector integration code with your platform.
 * You will implement it in the `send` method.
 * Reference List SMS API: https://zenviasmsenus.docs.apiary.io/#reference/api-services/list-new-sms-received
 */
export const controller: IMessageController = {
  send,
  createTransaction,
};

/**
 * @param message See the [[IMessage]] interface for more details.
 *
 * @returns This information will be sent to the Zenvia platform.
 */
async function send(message: IMessage): Promise<any[]> {
  logger.debug(`Sending the message [${JSON.stringify(message)}] to some platform`);

  const messages = [];

  const uri = 'https://api-rest.zenvia.com/services/received/list';

  logger.info(`Sending the request to [${uri}]`);

  try {
    const response = await rp.post({
      uri,
      headers: {
        authorization: `Basic ${message.credentials.authorization}`,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      json: true,
    });

    logger.debug(`Request sent successfully to [${uri}]. Response from some platform: ${JSON.stringify(response)}`);

    if (response.receivedResponse.statusCode === '00') {
      if (response.receivedResponse.receivedMessages && response.receivedResponse.receivedMessages.length > 0) {
        response.receivedResponse.receivedMessages.forEach((message: any) => {
          messages.push({
            status: 'SUCCESS',
            transactionId: message.id,
            message: message.body,
          });
        });
      }
    }

    messages.push({
      status: 'FAIL',
      message: `${response.receivedResponse.detailCode} - ${response.receivedResponse.detailDescription}`,
    });
  } catch (error) {
    messages.push({
      status: 'FAIL',
      message: error.message,
    });
  }

  return messages;
}

function createTransaction(message: IMessage, messageResponse: any[]): ITransaction[] {
  const transactions: ITransaction[] = [];

  messageResponse.forEach((response: any) => {
    let status = TransactionStatus.REJECTED_BY_PROVIDER;
    if (response && response.status === 'SUCCESS') {
      status = TransactionStatus.SENT_TO_PROVIDER;
    }

    const statusTransaction: ITransaction = {
      messageId: message.messageId,
      transactionId: response.transactionId || message.messageId,
      channel: message.channel,
      credentials: message.credentials,
      from: message.to[0],
      to: message.from,
      type: TransactionType.MSGSTATUS,
      status,
      content: [{
        type: 'application/json',
        payload: {
          json: [
            response,
          ],
        },
      }],
      timestamp: moment.utc().format(),
    };
    transactions.push(statusTransaction);

    const eventTransaction: ITransaction = {
      transactionId: response.transactionId || message.messageId,
      channel: message.channel,
      credentials: message.credentials,
      from: message.to[0],
      to: message.from,
      type: TransactionType.MSGEVENT,
      status: TransactionStatus.SENT_FROM_PROVIDER,
      content: [{
        type: message.content[0].type,
        payload: {
          json: {
            result: messageResponse,
          },
        },
      }],
      timestamp: moment.utc().format(),
    };
    transactions.push(eventTransaction);
  });

  return transactions;
}
