import { NextFunction, Request, Response, Router } from 'express';
import logger from '@zenvia/logger';
import * as config from 'config';
import { handleReceiveMessage } from '../../zenvia-custom-service/webhook-service';
import { IZenviaConfig } from '../../models/config';

const configZenvia = config.get<IZenviaConfig>('zenvia');

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const receivedToken = req.headers['x-auth-token'];

  if (!receivedToken || receivedToken !== configZenvia.webhook.token) {
    logger.warn('Webhook authentication failed: Invalid Token');
    return res.status(401).json({ status: 'UNAUTHORIZED', message: 'Invalid Token' });
  }
  return next();
}

async function webhookMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    logger.info('Receiving webhook request');

    handleReceiveMessage(req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export const router = Router();

router.post('/', authMiddleware, webhookMiddleware);
