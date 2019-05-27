import * as logger from '@zenvia/zcc-logger';

import { init as initApp, app } from './app';
import { init as initKafka } from './kafka';
import { init as initMessageHandler } from './handlers/message-handler';
import { init as initServer } from './server';

async function start(): Promise<void> {
  try {
    initKafka();
    initMessageHandler();
    await initApp();
    initServer(app);
  } catch (error) {
    logger.error('An error occurs while init app:', error.stack);
    throw error;
  }
}

start();
