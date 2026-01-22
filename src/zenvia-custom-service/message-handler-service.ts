import axios from 'axios';
import logger from "@zenvia/logger";
import * as config from 'config';
import { IMessage, IMessageDto, IMessageStatus } from './message';
import { IZenviaConfig } from '../models/config';

const zenviaConfig = config.get<IZenviaConfig>('zenvia');
const uri = zenviaConfig.uri;

export async function send(message: IMessageDto): Promise<IMessage> {
  logger.debug('Sending the message to Zenvia', { message });

  try {
    logger.info('Sending the request to uri', { uri });

    const response = await axios.post<IMessage>(uri, message, {
      headers: {
        'X-AUTH-TOKEN': zenviaConfig.webhook.token,
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

export async function sendMessageStatus(messageStatus: IMessageStatus): Promise<IMessageStatus> {
  logger.debug('Sending the message status status to Zenvia: ', { messageStatus });

  try {
    logger.info('Sending the message status request to uri', uri);

    const response = await axios.post<IMessageStatus>(uri, messageStatus, {
      headers: {
        'X-AUTH-TOKEN': zenviaConfig.webhook.token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      responseType: 'json',
    });

    logger.debug('Message status sent successfully. Response from Zenvia: ', { uri, response });

    return response.data;
  } catch (error: any) {
    logger.error('Error sending message status: ', { error });
    throw error;
  }
}
