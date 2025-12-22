BATCH_ID=ce5cb80e-78ab-4652-94d6-db09bf6bc2c6
FOLDER="$( cd $(dirname "${BASH_SOURCE[0]}"); pwd )"
ZEN_API_TOKEN= cat ${FOLDER}/zen-api-token.key

RESPONSE=$(curl -s \
-H"x-api-token: ${ZEN_API_TOKEN}" \
-H'Content-Type: application/json' \
"http://localhost:3000/v1/orders/${BATCH_ID}")

echo "${RESPONSE}" | jq
