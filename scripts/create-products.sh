FOLDER="$( cd $(dirname "${BASH_SOURCE[0]}"); pwd )"
ZEN_API_TOKEN= cat ${FOLDER}/zen-api-token.key

RESPONSE=$(curl -s \
-H"x-api-token: ${ZEN_API_TOKEN}" \
-H'Content-Type: application/json' \
'http://localhost:3000/v1/products' -d'[
  {
    "externalPlatform": "BLING",
    "externalId": "PROD-ELEC-001",
    "name": "Monitor UltraWide 29 Polegadas",
    "sku": "MON-LG-29",
    "ean": "7891234567890",
    "brand": "LG",
    "description": "Monitor IPS Full HD com HDR10",
    "measurementUnit": "UNID",
    "priceUnit": "1299,90",
    "currency": "BRL",
    "ncm": "85285220"
  },
  {
    "externalPlatform": "OMIE",
    "externalId": "PROD-OFFICE-055",
    "name": "Papel Sulfite A4 75g",
    "sku": "PAPEL-A4-CX",
    "ean": "7890000012345",
    "brand": "Chamex",
    "description": "Caixa com 5 resmas de 500 folhas",
    "measurementUnit": "CX5",
    "priceUnit": "145,50",
    "currency": "BRL",
    "ncm": "48025610"
  },
  {
    "externalPlatform": "TINY",
    "externalId": "PROD-RAW-900",
    "name": "Filamento PLA Preto 1.75mm",
    "sku": "FIL-PLA-BLK",
    "brand": "3D Fila",
    "description": "Filamento para impressão 3D",
    "measurementUnit": "KG",
    "priceUnit": "110,00",
    "currency": "BRL",
    "ncm": "39169090"
  }
]')

echo "${RESPONSE}" | jq
