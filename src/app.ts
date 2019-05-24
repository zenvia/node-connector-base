/* eslint-disable no-unused-vars */

import * as express from 'express';
import * as expressWinston from 'express-winston';
import * as logger from '@zenvia/zcc-logger';

import { ApplicationError, ClientError, IErrorDTO } from './models/errors';

export let app: express.Application;

function initApp(): void {
  app = express();
  app.disable('x-powered-by');
  app.enable('trust proxy');
}

function initAppMiddlewares(): void {
  app.use(expressWinston.logger({ winstonInstance: logger }));
  app.use(express.json());
}

async function initAppRoutes(): Promise<void> {
  const routes = await import('./routes');
  app.use('/', routes.router);
}

function initAppErrorHandlers(): void {
  // catch 404 and forward to error handler
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const err: any = new ClientError('NotFound', 'Not Found', 404);
    next(err);
  });

  // error handler
  app.use((err, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(err);
    if (err instanceof ApplicationError) {
      res.status(err.httpStatusCode || 500)
         .send(err.toDTO());
    } else if (err.statusCode) {
      const errorDTO: IErrorDTO = {
        code: err.name,
        message: err.message,
        httpStatusCode: err.statusCode };
      res.status(errorDTO.httpStatusCode)
         .send(errorDTO);
    } else {
      const errorDTO: IErrorDTO = {
        code: 'InternalError',
        message: 'Internal error',
        httpStatusCode: 500,
      };
      res.status(500)
         .send(errorDTO);
    }
  });
}

export async function init(): Promise<express.Application> {
  initApp();
  initAppMiddlewares();
  await initAppRoutes();
  initAppErrorHandlers();
  return app;
}
