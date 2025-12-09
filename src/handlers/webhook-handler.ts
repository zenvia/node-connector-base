import logger from '@zenvia/logger';;

import * as kafkaProducer from '../kafka/producer';
import { IWebhook } from '../models/webhook';
import { webhookController } from '../controllers';

export async function webhookHandler(webhook: IWebhook): Promise<void> {
  logger.debug(`Webhook content [${JSON.stringify(webhook)}] received`);

  const webhookResponse = await webhookController.receive(webhook);
  const transactions = await webhookController.createTransaction(webhook, webhookResponse);
  await kafkaProducer.sendTransactions(transactions);
}
