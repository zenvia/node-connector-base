import { ExampleWebhookController } from './example-webhook-controller';
import { IWebhookController } from './webhook-controller';
import { IWebhook } from '../models/webhook';

const exampleWebhookController = new ExampleWebhookController();

export function createController(message?: IWebhook): IWebhookController {
  return exampleWebhookController;
}
