import logger from '@zenvia/logger';

import { init as initApp, app } from './app';
import { Kafka } from './libs/kafka';
import { init as initServer } from './server';
import { send } from './zenvia-custom-service/message-handler-service';
import { IKafkaConfig } from './models/config';
import * as config from 'config';
import { IMessageDto } from './zenvia-custom-service/message';

const kafkaConfig = config.get<IKafkaConfig>('kafka');
const kafka = new Kafka(kafkaConfig);

async function gracefulShutdown(signal: string): Promise<void> {
  logger.info('Shutdown initiated', { signal });

  const forceExit = setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);

  try {
    await kafka.disconnect();
    logger.info('Clean exit completed', { signal });
    clearTimeout(forceExit);
    process.exit(0);
  } catch (err) {
    logger.error('Error during shutdown', err);
    process.exit(1);
  }
};

async function start(): Promise<void> {
  try {
    await kafka.connect();
    const messageConsumer = kafka.createConsumer<IMessageDto>();
    messageConsumer.addListener(async (msg) => {
      await send(msg)
    });
    await initApp();
    initServer(app);
  } catch (error) {
    logger.error('An error occurs while init app:', error.stack);
    throw error;
  }
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
}

start();
