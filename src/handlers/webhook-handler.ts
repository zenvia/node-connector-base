import logger from '@zenvia/logger';;
import { IWebhookPayload } from '../zenvia-custom-service/webhook';

export async function webhookHandler(payload: IWebhookPayload): Promise<void> {
  logger.info('Handler executing logic for message', { id: payload.id });
}
