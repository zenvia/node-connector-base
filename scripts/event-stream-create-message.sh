#!/bin/bash

FOLDER="$( cd $(dirname "${BASH_SOURCE[0]}"); pwd )"

JSON=$(cat << EOF
{
  "type": "MESSAGE",
  "timestamp": "2019-08-24T14:15:22Z",
  "provider": "string",
  "message": {
    "contents": [
      {
        "type": "text",
        "text": "This is a text."
      }
    ],
    "from": "string",
    "to": "string"
  }
}
EOF
)
echo "${JSON}" | jq -c . | \
docker compose -f $FOLDER/../docker-compose/docker-compose.yaml -p node-connector-base exec -T kafka \
/opt/kafka_2.11-0.10.1.0/bin/kafka-console-producer.sh \
--topic CONSUMER_TOPIC \
--broker-list localhost:9092
