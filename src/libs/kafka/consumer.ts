import { KafkaJS } from '@confluentinc/kafka-javascript'; // ou kafka-javascript
import logger from '@zenvia/logger';
import { Observable, CallbackFn } from '../observable';
import { IKafkaConfig } from '../../models/config';

export type ParserFn<T> = (message: string | Buffer) => T | null;

const defaultJsonParser = <T>(message: string | Buffer): T | null => {
  try {
    if (!message) return null;

    const content = typeof message === 'string' ? message : message.toString();
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
};

export class KafkaConsumer<T> {
  private observer: Observable<T> = new Observable();
  private isRunning = false;

  constructor(
    private rawConsumer: KafkaJS.Consumer,
    private config: IKafkaConfig,
    private parser: ParserFn<T> = defaultJsonParser
  ) {}

  async addListener(listener: CallbackFn<T>): Promise<void> {
    this.observer.subscribe(listener);

    if (!this.isRunning) {
      await this.startConsumer();
    }
  }

  private async startConsumer(): Promise<void> {
    logger.debug('Starting Kafka consumer loop...');
    this.isRunning = true;

    try {
      await this.rawConsumer.run({
        partitionsConsumedConcurrently: this.config.partitionsConsumedConcurrently || 1,
        eachMessage: async (payload: KafkaJS.EachMessagePayload) => {
          await this.handleMessage(payload);
        },
      });
    } catch (error) {
      this.isRunning = false;
      logger.error('Error in Kafka consumer run loop:', error);
      throw error;
    }
  }

  private async handleMessage({ topic, partition, message }: KafkaJS.EachMessagePayload): Promise<void> {
    try {
      const data = this.parser(message.value);
      if (!data) {
        logger.warn('Skipping unparsable or empty message', { topic, partition, offset: message.offset });
        return;
      }

      this.observer.notify(data);
    } catch (error) {
      logger.error('Error processing message inside handler', error);
    }
  }
}
