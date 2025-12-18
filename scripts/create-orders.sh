FOLDER="$( cd $(dirname "${BASH_SOURCE[0]}"); pwd )"
ZEN_API_TOKEN= cat ${FOLDER}/zen-api-token.key

RESPONSE=$(curl -s \
-H"x-api-token: ${ZEN_API_TOKEN}" \
-H'Content-Type: application/json' \
'http://localhost:3000/v1/orders' -d'[
  {
    "externalPlatform": "OTHER",
    "externalId": "ORD-500",
    "invoiceExternalId": "NFE-1234",
    "customerExternalId": "CLI-1001",
    "orderNumber": "v500",
    "orderTimestamp": "2023-12-18 14:35:00",
    "totalAmount": "339,90",
    "email": "[carlos.silva@empresa.com]",
    "orderStatus": "PAYMENT_CONFIRMED",
    "items": [
      {
        "productExternalId": "PROD-001",
        "name": "Teclado Mecânico RGB",
        "quantity": "1,00",
        "measurementUnit": "UNID",
        "priceUnit": "250,00",
        "currency": "BRL",
        "sku": "KEY-RGB-01"
      },
      {
        "productExternalId": "PROD-002",
        "name": "Mousepad Extra Grande",
        "quantity": "1,00",
        "measurementUnit": "UNID",
        "priceUnit": "89,90",
        "currency": "BRL",
        "sku": "PAD-XL"
      }
    ]
  }
]')

echo "${RESPONSE}" | jq
