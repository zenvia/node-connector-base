import * as moment from 'moment';
import * as rp from 'request-promise';
import * as logger from '@zenvia/zcc-logger';

import { IMessageController } from './message-controller';
import { IMessage } from '../models/message';
import { ITransaction, TransactionStatus, TransactionType } from '../models/transaction';

/**
 * Example connector integration code with your platform.
 * You will implement it in the `send` method.
 * Reference Send SMS API: https://zenviasmsenus.docs.apiary.io/#reference/api-services/sending-a-single-sms
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

  const result = message.content
  .map(async (content: any) => {
    try {
      const response = await sendSms(message, content);
      if (response === null) {
        return null;
      }

      if (response.sendSmsResponse.statusCode === '00') {
        return {
          status: 'SUCCESS',
          message: response.sendSmsResponse.detailDescription,
        };
      }

      return {
        status: 'FAIL',
        message: `${response.sendSmsResponse.detailCode} - ${response.sendSmsResponse.detailDescription}`,
      };
    } catch (error) {
      return {
        status: 'FAIL',
        message: error.message,
      };
    }
  })
  .filter(response => response !== null);

  return await Promise.all(result);
}

function sendSms(message: IMessage, content: any): Promise<any> {
  if (content.type === 'text/plain') {
    return rp.post({
      uri: 'https://api-rest.zenvia.com/services/send-sms',
      headers: {
        authorization: `Basic ${message.credentials.authorization}`,
      },
      body: {
        sendSmsRequest: {
          from: message.from,
          to: message.to[0],
          msg: content.payload.text,
        },
      },
      json: true,
    });
  }

  return null;
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
      transactionId: message.messageId,
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
  });

  return transactions;
}
