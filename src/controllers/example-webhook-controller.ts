import { IWebhookController } from './webhook-controller';
import { IWebhook } from '../models/webhook';
import { ITransaction, TransactionStatus, TransactionType } from '../models/transaction';
import * as logger from '@zenvia/zcc-logger';
import * as moment from 'moment';

/**
 * Example code for integrating your platform with the connector.
 * You will implement it in the `receive` method.
 */
export class ExampleWebhookController implements IWebhookController {

  /**
   * @param webhook      See the [[IWebhook]] interface for more details.
   * @param retryCounter Retries counter.
   *
   * @returns This information will be sent to the Zenvia platform.
   */
  receive(webhook: IWebhook, retryCounter?: number): any {
    logger.debug(`Sending the transaction [${JSON.stringify(webhook)}] to Zenvia platform`);

    return {
      status: 'SUCCESS',
      message: webhook.body.message,
    };
  }

  createTransaction(webhook: IWebhook, webhookResponse: any): ITransaction[] {
    const transactions: ITransaction[] = [];

    const eventTransaction: ITransaction = {
      transactionId: webhook.body.transactionId,
      channel: {
        type: 'CHANNEL_TYPE',
        provider: 'CHANNEL_PROVIDER',
      },
      credentials: {
        integrationId: webhook.integrationIdentifier,
      },
      from: webhook.body.from,
      to: webhook.integrationIdentifier,
      type: TransactionType.MSGEVENT,
      status: TransactionStatus.SENT_FROM_PROVIDER,
      content: [{
        type: 'application/json',
        payload: {
          json: {
            result: webhookResponse,
          },
        },
      }],
      timestamp: moment.utc().format(),
    };
    transactions.push(eventTransaction);

    return transactions;
  }

}
