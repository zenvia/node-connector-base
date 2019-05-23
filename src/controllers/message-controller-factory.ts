import { ExampleMessageController } from './example-message-controller';
import { IMessageController } from './message-controller';
import { IMessage } from '../models/message';

const exampleMessageController = new ExampleMessageController();

export function createController(message?: IMessage): IMessageController {
  return exampleMessageController;
}
