import logger from '@zenvia/logger';
import { IWebhookPayload } from '../zenvia-custom-service/webhook';
import { IMessageStatus } from '../zenvia-custom-service/message';
import { sendMessageStatus } from '../zenvia-custom-service/message-handler-service';

export async function webhookHandler(payload: IWebhookPayload): Promise<void> {
  logger.info('Handler executing logic for message', { id: payload.id });
  // Implement your custom logic here
  await customLogic(payload);
}

async function customLogic(payload: IWebhookPayload): Promise<void> {
  const timestamp = new Date().toISOString();
  const status: IMessageStatus = {
    type: 'MESSAGE_STATUS',
    timestamp,
    provider: 'MY_PROVIDER',
    message: {
      id: payload.id,
      from: payload.from,
      to: payload.to,
      chatId: payload.chatId,
      threadId: payload.threadId,
    },
    messageStatus: {
      timestamp,
      code: 'DELIVERED',
    },
  };

  await sendMessageStatus(status);
}
