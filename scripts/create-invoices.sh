FOLDER="$( cd $(dirname "${BASH_SOURCE[0]}"); pwd )"
ZEN_API_TOKEN= cat ${FOLDER}/zen-api-token.key

RESPONSE=$(curl -s \
-H"x-api-token: ${ZEN_API_TOKEN}" \
-H'Content-Type: application/json' \
'http://localhost:3000/v1/invoices' -d'[
  {
    "externalPlatform": "OMIE",
    "externalId": "NFE-999",
    "customerExternalId": "CLI-1001",
    "issueTimestamp": "2023-12-18 10:00:00",
    "invoiceKey": "35231200000000000000550010000009991000000000",
    "invoiceNumber": "999",
    "invoiceSerie": "1",
    "orderNumber": "v500",
    "email": "financeiro@empresa.com",
    "totalAmount": "339,90",
    "items": [
      {
        "productExternalId": "PROD-001",
        "name": "Teclado Mecânico RGB",
        "quantity": "1,00",
        "measurementUnit": "UNID",
        "priceUnit": "250,00",
        "totalValue": "250,00",
        "currency": "BRL",
        "fiscalOperationCode": "5102",
        "ncm": "84716052"
      },
      {
        "productExternalId": "PROD-002",
        "name": "Mousepad Extra Grande",
        "quantity": "1,00",
        "measurementUnit": "UNID",
        "priceUnit": "89,90",
        "totalValue": "89,90",
        "currency": "BRL",
        "fiscalOperationCode": "5102"
      }
    ]
  }
]')

echo "${RESPONSE}" | jq
