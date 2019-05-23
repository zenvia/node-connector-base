import { IMessage } from '../models/message';
import { ITransaction } from '../models/transaction';

export interface IMessageController {

  send(message: IMessage, retryCounter?: number): Promise<any>;
  createTransaction(message: IMessage, messageResponse: any): ITransaction[];

}
