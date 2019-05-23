import * as logger from '@zenvia/zcc-logger';
import * as kafkaProducer from '../kafka/producer';
import { IWebhook } from '../models/webhook';
import { IWebhookController } from '../controllers/webhook-controller';
import * as webhookControllerFactory from '../controllers/webhook-controller-factory';

export async function webhookHandler(webhook: IWebhook): Promise<void> {
  logger.debug(`Webhook content [${JSON.stringify(webhook)}] received`);

  const webhookController: IWebhookController = webhookControllerFactory.createController(webhook);
  const webhookResponse = await webhookController.receive(webhook);
  const transactions = await webhookController.createTransaction(webhook, webhookResponse);
  await kafkaProducer.sendTransactions(transactions);
}
