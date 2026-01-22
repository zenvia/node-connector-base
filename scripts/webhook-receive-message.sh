#!/bin/bash

FOLDER="$( cd $(dirname "${BASH_SOURCE[0]}"); pwd )"

RESPONSE=$(curl -s \
-H"x-auth-token: WEBHOOK_TOKEN" \
-H'Content-Type: application/json' \
'http://localhost:3000/v1/webhook' -d'{
  "message": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "from": "5511999999999",
    "to": "5511888888888",
    "contents": [
      {
        "type": "text",
        "text": "Hello, this is a test message!"
      }
    ]
  },
  "timestamp": "2024-01-01T12:00:00Z",
  "type": "MESSAGE"
}')

echo "${RESPONSE}" | jq
