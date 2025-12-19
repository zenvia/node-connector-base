import axios from 'axios';
import logger from "@zenvia/logger";
import * as config from 'config';
import { IMessage, IZenviaConfig } from './message';

const zenviaConfig: IZenviaConfig = config.get('zenvia');
const uri = zenviaConfig.uri;

export async function send(message: IMessage, token: string): Promise<any> {
  logger.debug('Sending the message to Zenvia', { message });

  try {
    logger.info('Sending the request to uri', uri);

    const response = await axios.post(uri, message, {
      headers: {
        'X-AUTH-TOKEN': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      responseType: 'json',
    });

    logger.debug('Request sent successfully. Response from Zenvia', {uri, response: response.data});

    return response.data;
  } catch (error: any) {
    logger.error('Error sending message: ', { error });
    throw error;
  }
}

export async function sendMessageStatus(message: IMessage, token: string): Promise<any> {
  logger.debug('Sending the message status to Zenvia: ', { message });

  try {
    logger.info('Sending the status request to uri', uri);

    const response = await axios.post(uri, message, {
      headers: {
        'X-AUTH-TOKEN': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      responseType: 'json',
    });

    logger.debug('Status sent successfully. Response from Zenvia: ', { uri, response });

    return response.data;
  } catch (error: any) {
    logger.error('Error sending message status: ', { error });
    throw error;
  }
}
