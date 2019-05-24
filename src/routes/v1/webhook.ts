import { NextFunction, Request, Response, Router } from 'express';
import * as logger from '@zenvia/zcc-logger';

import { IWebhook } from '../../models/webhook';
import { webhookHandler } from '../../handlers/webhook-handler';

export const router = Router();

async function webhookMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const webhook: IWebhook = {
      headers: req.headers,
      params: req.params,
      query: req.query,
      body: req.body,
    };

    logger.info(`Receiving [${JSON.stringify(webhook)}] webhook content`);

    await webhookHandler(webhook);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

router.post('/', webhookMiddleware);
