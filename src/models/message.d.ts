// tslint:disable:prefer-array-literal
export interface IMessage {

  messageId: string;
  channel: {
    type: string;
    provider: string;
  };
  credentials: any;
  from: string;
  to: string[];
  content: Array<{
    type: string;
    payload: any;
  }>;
  details: any;

}
