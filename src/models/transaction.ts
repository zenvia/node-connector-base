// tslint:disable:prefer-array-literal

export enum TransactionType {

  MSGEVENT = 'MSGEVENT',
  MSGSTATUS = 'MSGSTATUS',

}

export enum TransactionStatus {

  REJECTED_BY_CONNECTOR = 'REJECTED_BY_CONNECTOR',
  REJECTED_BY_PROVIDER = 'REJECTED_BY_PROVIDER',
  SENT_TO_PROVIDER = 'SENT_TO_PROVIDER',
  SENT_FROM_PROVIDER = 'SENT_FROM_PROVIDER',

}

export interface ITransaction {

  messageId?: string;
  transactionId: string;
  channel: {
    type: string;
    provider: string;
  };
  credentials: any;
  from: string;
  to: string;
  type: TransactionType;
  status: TransactionStatus;
  content: Array<{
    type: string;
    payload: any;
  }>;
  timestamp: string;

}
