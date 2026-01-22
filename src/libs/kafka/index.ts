import { KafkaJS } from '@confluentinc/kafka-javascript';
import logger from '@zenvia/logger';
import { IKafkaConfig } from '../../models/config';
import { KafkaProducer } from './producer';
import { KafkaConsumer } from './consumer';

export class Kafka {
  private client: KafkaJS.Kafka;
  private producerInstance?: KafkaJS.Producer;
  private consumerInstance?: KafkaJS.Consumer;

  constructor(private config: IKafkaConfig) {
    this.client = new KafkaJS.Kafka({
      kafkaJS: {
        clientId: config.clientId || 'my-app',
        brokers: config.uri.split(','),
        logLevel: KafkaJS.logLevel.WARN,
      },
    });
  }

  async connect(): Promise<void> {
    logger.debug('Connecting to Kafka brokers...');

    this.producerInstance = this.client.producer();
    await this.producerInstance.connect();

    const consumerTopics = this.config.consumerTopics ? this.config.consumerTopics.split(',') : [];
    this.consumerInstance = this.client.consumer({ "group.id": this.config.groupId || 'connector' });
    await this.consumerInstance.connect();

    if (consumerTopics.length > 0) {
      await this.consumerInstance.subscribe({ topics: consumerTopics });
    }

    logger.info('Kafka connected (Producer and Consumer)');
  }

  // Factory para criar um Producer genérico
  createProducer(): KafkaProducer {
    if (!this.producerInstance) throw new Error('Kafka not connected');
    return new KafkaProducer(this.producerInstance, this.config);
  }

  // Factory para criar um Consumer genérico para um tipo T
  createConsumer<T>(): KafkaConsumer<T> {
    if (!this.consumerInstance) throw new Error('Kafka not connected');
    return new KafkaConsumer<T>(this.consumerInstance, this.config);
  }

  async disconnect(): Promise<void> {
    await this.producerInstance?.disconnect();
    await this.consumerInstance?.disconnect();
  }
}
