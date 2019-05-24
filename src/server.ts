import * as express from 'express';
import { createServer } from 'http';
import * as logger from '@zenvia/zcc-logger';

function normalizePort(val: any): any {
  const iport = parseInt(val, 10);
  if (isNaN(iport)) {
    return val; // named pipe
  }
  if (iport >= 0) {
    return iport; // port number
  }
  return false;
}

function createOnServerError(bindTitle: string): (error: any) => void {
  return (error) =>  {
    if (error.syscall !== 'listen') {
      throw error;
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        logger.error(`Server Init Error: ${bindTitle} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(`Server Init Error:  - ${bindTitle} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
}

function createOnServerListening(bindTitle: string): () => void {
  return () => {
    logger.info(`Server listening on ${bindTitle}`);
  };
}

export function init(app: express.Application): void {
  let server;
  const port = normalizePort(process.env.PORT || '3000');
  const bindTitle = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;
  app.set('port', port);
  server = createServer(app);
  server.listen(port);
  server.on('error', createOnServerError(bindTitle));
  server.on('listening', createOnServerListening(bindTitle));
}
