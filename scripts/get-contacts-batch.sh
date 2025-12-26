BATCH_ID=f5f0a086-e4de-4648-b69d-ec89a10643dd

FOLDER="$( cd $(dirname "${BASH_SOURCE[0]}"); pwd )"
ZEN_API_TOKEN= cat ${FOLDER}/zen-api-token.key

RESPONSE=$(curl -s \
-H"x-api-token: ${ZEN_API_TOKEN}" \
-H'Content-Type: application/json' \
"http://localhost:3000/v1/contacts/${BATCH_ID}")

echo "${RESPONSE}" | jq
