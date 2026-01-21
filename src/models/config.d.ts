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
  producerTopicHighPriority: string;
  producerTopicLowPriority: string;
  consumerTopics: string;
  retry: number;
  wait: number;
}
