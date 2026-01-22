export interface IZenviaConfig {
  uri: string;
  webhook: {
    token: string;
  }
}

export interface IZenAPIConfig {
  uri: string;
}

export interface IKafkaConfig {
  uri: string;
  clientId?: string;
  groupId?: string;
  producerTopicHighPriority: string;
  producerTopicLowPriority: string;
  consumerTopics: string;
  partitionsConsumedConcurrently: number;
  retry: number;
  wait: number;
}
