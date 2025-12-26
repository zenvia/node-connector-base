import { NextFunction, Request, Response, Router } from 'express';
import logger from '@zenvia/logger';
import * as config from 'config';
import { handleReceiveMessage } from '../../zenvia-custom-service/webhook-service';

interface IZenviaConfig {
  webhook: {
    token: string;
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const receivedToken = req.headers['x-auth-token'];
  const configZenvia: IZenviaConfig = config.get('zenvia');

  if (!receivedToken || receivedToken !== configZenvia.webhook.token) {
    logger.warn('Webhook authentication failed: Invalid Token');
    return res.status(401).json({ status: 'UNAUTHORIZED', message: 'Invalid Token' });
  }
  return next();
}

async function webhookMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    logger.info('Receiving webhook request');

    await handleReceiveMessage(req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export const router = Router();

router.post('/', authMiddleware, webhookMiddleware);
