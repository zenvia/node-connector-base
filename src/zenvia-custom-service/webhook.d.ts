
export interface IWebhook {
  headers?: any;
  params?: any;
  query?: any;
  body?: IWebhookPayload;
}

export interface IWebhookContent {
  type: string;
  text?: string;
  payload?: string;
  [key: string]: any;
}

export interface ITextContent extends IWebhookContent {
  type: 'text';
  text: string;
  payload?: string;
}

export interface IFileContent extends IWebhookContent {
  type: 'file';
  fileUrl: string;
  fileCaption?: string;
  fileMimeType?: string;
  fileName?: string;
  thumbnailUrl?: string;
  thumbnailMimeType?: string;
}

export interface IJsonContent extends IWebhookContent {
  type: 'json';
  payload: Record<string, any>;
}

type WebhookContent = ITextContent | IFileContent | IJsonContent;

export interface IWebhookPayload {
  contents: WebhookContent[];
  from: string;
  to: string;
  chatId?: string;
  threadId?: string[];
  direction?: 'IN' | 'OUT';
  channel?: string;
  id?: string;
  timestamp?: string;
}
