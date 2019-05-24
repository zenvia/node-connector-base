import * as moment from 'moment';
import { post } from 'request-promise';
import * as logger from '@zenvia/zcc-logger';

import { IMessageController } from './message-controller';
import { IMessage } from '../models/message';
import { ITransaction, TransactionStatus, TransactionType } from '../models/transaction';

function sendMessageToFacebook(message: IMessage, content: any): Promise<any> {
  if (content.type === 'text/plain') {
    const facebookMessage = {
      recipient: message.to[0],
      message: {
        text: content.payload.text,
      },
    };
    const pageAccessToken = message.credentials.pageAccessToken;
    return post({
      uri: 'https://graph.facebook.com/v2.11/me/messages',
      body: facebookMessage,
      json: true,
      qs: {
        access_token: pageAccessToken,
      },
    });
  }
  return null;
}

/**
 * @param message      See the [[IMessage]] interface for more details.
 *
 * @returns This information will be sent to the Zenvia platform.
 */
function send(message: IMessage): any[] {
  logger.debug(`Sending the message [${JSON.stringify(message)}] to some platform`);

  return message.content
  .map(async (content) => {
    try {
      const response = await sendMessageToFacebook(message, content);
      if (response === null) {
        return null;
      }
      return {
        status: 'FAIL',
        facebookMessageId: response.message_id,
      };
    } catch (error) {
      return {
        status: 'FAIL',
        message: 'Hello world',
      };
    }
  })
  .filter(resp => resp !== null);
}

function createTransaction(message: IMessage, messageResponse: any[]): ITransaction[] {
  const transactions: ITransaction[] = [];

  let status = TransactionStatus.REJECTED_BY_PROVIDER;
  if (messageResponse && messageResponse.status === 'SUCCESS') {
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
          messageResponse,
        ],
      },
    }],
    timestamp: moment.utc().format(),
  };
  transactions.push(statusTransaction);

  const eventTransaction: ITransaction = {
    transactionId: message.messageId,
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

  return transactions;
}

/**
 * Example connector integration code with your platform.
 * You will implement it in the `send` method.
 */
export const controller: IMessageController = {
  send,
  createTransaction,
};
