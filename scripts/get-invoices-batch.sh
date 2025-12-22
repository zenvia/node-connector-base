BATCH_ID=cfd677a0-0a1f-4dbb-82ad-0658c70b0cfb
FOLDER="$( cd $(dirname "${BASH_SOURCE[0]}"); pwd )"
ZEN_API_TOKEN= cat ${FOLDER}/zen-api-token.key

RESPONSE=$(curl -s \
-H"x-api-token: ${ZEN_API_TOKEN}" \
-H'Content-Type: application/json' \
"http://localhost:3000/v1/invoices/${BATCH_ID}")

echo "${RESPONSE}" | jq
