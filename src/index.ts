import logger from '@zenvia/logger';

import { init as initApp, app } from './app';
import { init as initKafka } from './kafka';
import { init as initServer } from './server';

async function start(): Promise<void> {
  try {
    initKafka();
    await initApp();
    initServer(app);
  } catch (error) {
    logger.error('An error occurs while init app:', error.stack);
    throw error;
  }
}

start();
