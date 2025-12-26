BATCH_ID=274c6559-6d68-4c4d-944c-17afaa55c195
FOLDER="$( cd $(dirname "${BASH_SOURCE[0]}"); pwd )"
ZEN_API_TOKEN= cat ${FOLDER}/zen-api-token.key

RESPONSE=$(curl -s \
-H"x-api-token: ${ZEN_API_TOKEN}" \
-H'Content-Type: application/json' \
"http://localhost:3000/v1/products/${BATCH_ID}")

echo "${RESPONSE}" | jq
