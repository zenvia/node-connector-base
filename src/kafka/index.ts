import * as Bluebird from 'bluebird';
import * as config from 'config';
import { KafkaClient, HighLevelProducer, ConsumerGroup, ConsumerGroupOptions, ProduceRequest, Message, KeyedMessage } from 'kafka-node';
import * as logger from '@zenvia/zcc-logger';
export { KeyedMessage, ProduceRequest };

let client: KafkaClient;
let producer: HighLevelProducer;
let consumer: ConsumerGroup;

export function init(): void {
  const kafkaConfig: any = config.get('kafka');
  logger.debug(`Loaded kafka configuration: ${JSON.stringify(kafkaConfig)}`);

  client = new KafkaClient({
    kafkaHost: kafkaConfig.uri,
  });
  client.on('error', err => logger.error('Kafka Client Error:', err));

  producer = new HighLevelProducer(client);
  producer.on('error', err => logger.error('Kafka Producer Error:', err));

  const consumerOptions: ConsumerGroupOptions = {
    groupId: 'connector',
    encoding: 'utf8',
    kafkaHost: kafkaConfig.uri,
  };
  const consumerTopics = kafkaConfig.consumerTopics ? kafkaConfig.consumerTopics.split(',') : null;
  consumer = new ConsumerGroup(consumerOptions, consumerTopics);
}

export function registerMessageListener(listener: (message: Message) => any): void {
  consumer.on('message', listener);
}

export function sendMessage(message: ProduceRequest): Promise<any> {
  return Promise.resolve(Bluebird.fromCallback(callback => producer.send([message], callback)));
}
