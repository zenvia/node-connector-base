import { IMessageController } from './message-controller';
import { IMessage } from '../models/message';
import { ITransaction, TransactionStatus, TransactionType } from '../models/transaction';
import * as logger from '@zenvia/zcc-logger';
import * as moment from 'moment';

/**
 * Example connector integration code with your platform.
 * You will implement it in the `send` method.
 */
export class ExampleMessageController implements IMessageController {

  /**
   * @param message      See the [[IMessage]] interface for more details.
   * @param retryCounter Comment for parameter ´text´.
   *
   * @returns This information will be sent to the Zenvia platform.
   */
  send(message: IMessage, retryCounter?: number): any {
    logger.debug(`Sending the message [${JSON.stringify(message)}] to some platform`);

    return {
      status: 'SUCCESS',
      message: 'Hello world',
    };
  }

  createTransaction(message: IMessage, messageResponse: any): ITransaction[] {
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

}
