import { IWebhook } from '../models/webhook';
import { ITransaction } from '../models/transaction';

export interface IWebhookController {

  receive(webhook: IWebhook): any[];
  createTransaction(webhook: IWebhook, messageResponse: any[]): ITransaction[];

}
