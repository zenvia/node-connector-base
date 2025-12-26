import logger from "@zenvia/logger";
import { webhookHandler } from '../handlers/webhook-handler';
import { IWebhookPayload } from "./webhook";

export async function handleReceiveMessage(payload: IWebhookPayload): Promise<void> {
  logger.info('Webhook service started.', { id: payload.id, from: payload.from, channel: payload.channel });

  try {
    logger.debug('Full webhook payload to process:', { payload });

    await processMessage(payload);
  } catch (error: any) {
    logger.error('Error processing webhook service', { id: payload.id, error: error.message });
    throw error;
  }
}

async function processMessage(payload: IWebhookPayload): Promise<void> {
  await webhookHandler(payload);
}
