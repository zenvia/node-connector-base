import { IBaseMessage, TContent } from './message';

export interface IWebhookPayload extends Omit<IBaseMessage, 'id'> {
  id?: string;
  contents: TContent[];
  direction?: 'IN' | 'OUT';
  channel?: string;
  timestamp?: string;
}

export interface IWebhook {
  headers?: any;
  params?: any;
  query?: any;
  body?: IWebhookPayload;
}
