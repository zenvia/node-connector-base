export interface IZenviaConfig {
  uri: string;
}

export interface ITextContent {
  type: 'text';
  text: string;
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
  payload: Record<string, any>;
}

type TContent = ITextContent | IFileContent | IJsonContent;

export interface IMessage {
  type: string;
  timestamp: string;
  provider: string;
  message: {
    from: string;
    to: string;
    contents: Array<TContent>;
    chatId?: string;
    threadId?: string[];
    externalId?: any;
    idRef?: string;
  }
}

export interface IMessageStatus {
  type: string;
  timestamp: string;
  provider: string;
  messageStatus: {
    timestamp: string;
    code: string;
    description?: string;
    causes?: Array<{
      channelErrorCode: string;
      reason: string;
      details: string;
    }>;
  }
  message: {
    id: string;
    from: string;
    to: string;
    chatId?: string;
    threadId?: string[];
  }
}
