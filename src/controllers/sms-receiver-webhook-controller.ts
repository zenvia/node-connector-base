import * as moment from 'moment';
import * as logger from '@zenvia/zcc-logger';

import { ITransaction, TransactionStatus, TransactionType } from '../models/transaction';
import { IWebhook } from '../models/webhook';
import { IWebhookController } from './webhook-controller';

/**
 * Example code for integrating your platform with the connector.
 * You will implement it in the `receive` method.
 * Reference Receive SMS API: https://zenviasmsenus.docs.apiary.io/#reference/api-services/sending-a-single-sms
 */
export const controller: IWebhookController = {
  receive,
  createTransaction,
};

/**
 * @param webhook See the [[IWebhook]] interface for more details.
 *
 * @returns This information will be sent to the Zenvia platform.
 */
function receive(webhook: IWebhook): any[] {
  logger.debug(`Sending the transaction [${JSON.stringify(webhook)}] to Zenvia platform`);

  const response: any[] = [];

  if (webhook.body.callbackMtRequest) {
    const message = webhook.body.callbackMtRequest;

    response.push({
      type: 'STATUS',
      messageId: message.id,
      transactionId: message.id,
      integrationId: message.id,
      from: message.id,
      to: message.id,
      message: message.statusDetailMessage,
    });
  }

  if (webhook.body.callbackMoRequest) {
    const message = webhook.body.callbackMoRequest;

    response.push({
      type: 'MESSAGE',
      transactionId: message.id,
      integrationId: message.account,
      from: message.mobile,
      to: message.shortCode,
      message: message.body,
    });
  }

  return response;
}

function createTransaction(webhook: IWebhook, webhookResponse: any[]): ITransaction[] {
  const transactions: ITransaction[] = [];

  webhookResponse.forEach((response: any) => {
    if (response.type === 'STATUS') {
      const statusTransaction: ITransaction = {
        messageId: response.messageId,
        transactionId: response.messageId,
        channel: {
          type: 'CHANNEL_TYPE',
          provider: 'CHANNEL_PROVIDER',
        },
        credentials: {
          integrationId: response.integrationId,
        },
        from: response.from,
        to: response.to,
        type: TransactionType.MSGSTATUS,
        status: TransactionStatus.SENT_FROM_PROVIDER,
        content: [{
          type: 'application/json',
          payload: {
            json: [
              {
                message: response.message,
              },
            ],
          },
        }],
        timestamp: moment.utc().format(),
      };
      transactions.push(statusTransaction);
    }

    if (response.type === 'MESSAGE') {
      const eventTransaction: ITransaction = {
        transactionId: response.transactionId,
        channel: {
          type: 'CHANNEL_TYPE',
          provider: 'CHANNEL_PROVIDER',
        },
        credentials: {
          integrationId: response.integrationId,
        },
        from: response.from,
        to: response.to,
        type: TransactionType.MSGEVENT,
        status: TransactionStatus.SENT_FROM_PROVIDER,
        content: [{
          type: 'text/plain',
          payload: {
            text: response.message,
          },
        }],
        timestamp: moment.utc().format(),
      };
      transactions.push(eventTransaction);
    }
  });

  return transactions;
}
