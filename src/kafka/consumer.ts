import logger from '@zenvia/logger';;

import { Observable, CallbackFn } from '../libs/observable';
import { registerMessageListener } from '../kafka';
import { IMessage } from '../models/message';

const onMessageObserver: Observable<IMessage> = new Observable();
let ready = false;

export function addListener(listener: CallbackFn<IMessage>): void {
  onMessageObserver.subscribe(listener);
  if (!ready) {
    initConsumer();
  }
}

function initConsumer(): void {
  logger.debug('Initializing Kafka consumer');

  registerMessageListener((kafkaMessage): boolean => {
    const message = parseMessage(kafkaMessage.value) ;
    if (message) {
      logger.info(`Message [${JSON.stringify(message)}] received from Kafka`);
      onMessageObserver.notify(message);
      return true;
    }
    return false;
  });
  ready = true;
}

function parseMessage(message: string | Buffer): IMessage {
  try {
    return JSON.parse((typeof message === 'string') ? message : message.toString());
  } catch (error) {
    logger.error('Unabled to parse received message from kafka', error);
    return null;
  }
}
