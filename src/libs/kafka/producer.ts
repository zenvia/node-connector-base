import { v4 as uuidv4 } from 'uuid';
import logger from '@zenvia/logger';
import { IKafkaConfig } from '../../models/config';
import { KafkaJS } from '@confluentinc/kafka-javascript';

export class KafkaProducer {
  constructor(
    private rawProducer: KafkaJS.Producer,
    private config: IKafkaConfig
  ) {}

  async send<T>(topic: string, data: T): Promise<boolean> {
    if (!data) return false;

    const key = uuidv4();
    return this.sendToKafka(key, topic, data);
  }

  private async sendToKafka(key: string, topic: string, data: any, retryCounter = 0): Promise<boolean> {
    const start = Date.now();

    try {
      const kafkaMessage: KafkaJS.ProducerRecord = {
        topic,
        messages: [{ key, value: JSON.stringify(data) }],
      };

      this.rawProducer.send(kafkaMessage)
      logger.info(`Message sent to ${topic} in ${Date.now() - start}ms`);
      return true;
    } catch (error) {
      if (retryCounter < this.config.retry) {
        await new Promise(resolve => setTimeout(resolve, this.config.wait));
        return this.sendToKafka(key, topic, data, retryCounter + 1);
      }
      logger.error(`Max retries reached for topic ${topic}`, error);
      return false;
    }
  }
}
