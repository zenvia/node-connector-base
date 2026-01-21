export interface ITextContent {
  type: 'text';
  text: string;
  payload?: string;
}

export interface IFileContent {
  type: 'file';
  fileUrl: string;
  fileCaption?: string;
  fileMimeType?: string;
  fileName?: string;
  thumbnailUrl?: string;
  thumbnailMimeType?: string;
}

export interface IJsonContent {
  type: 'json';
  payload: Record<string, unknown>;
}

export type TContent = ITextContent | IFileContent | IJsonContent;

export type TransactionType = 'MESSAGE' | 'MESSAGE_STATUS';

export type MessageStatusCode =
  | 'REJECTED' | 'SENT' | 'DELIVERED' | 'NOT_DELIVERED'
  | 'READ' | 'DELETED' | 'CLICKED' | 'VERIFIED';

interface ITransaction<T extends TransactionType> {
  type: T;
  /** Date ISO 8601 */
  timestamp: string;
  provider: string;
}

interface IBaseMessage {
  id: string;
  from: string;
  to: string;
  chatId?: string;
  threadId?: string[];
}

interface IMessageBodyDetails {
  contents: Array<TContent>;
  externalId?: string;
  idRef?: string;
}

export interface IMessage extends ITransaction<'MESSAGE'> {
  message: IBaseMessage & IMessageBodyDetails;
}

export interface IMessageDto extends ITransaction<'MESSAGE'> {
  message: Omit<IBaseMessage, 'id'> & IMessageBodyDetails;
}

export interface IMessageStatus extends ITransaction<'MESSAGE_STATUS'> {
  messageStatus: {
    timestamp: string;
    code: MessageStatusCode;
    description?: string;
    causes?: Array<{
      channelErrorCode: string;
      reason: string;
      details: string;
    }>;
  };
  message: IBaseMessage;
}
