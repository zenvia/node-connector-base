FOLDER="$( cd $(dirname "${BASH_SOURCE[0]}"); pwd )"
ZEN_API_TOKEN= cat ${FOLDER}/zen-api-token.key

RESPONSE=$(curl -s \
-H"x-api-token: ${ZEN_API_TOKEN}" \
-H'Content-Type: application/json' \
'http://localhost:3000/v1/contacts' -d'[
  {
    "externalPlatform": "OMIE",
    "externalId": "CLI-1001",
    "firstName": "Carlos Silva",
    "lastName": "Junior",
    "birthdate": "1985-05-20",
    "email": "[carlos.silva@empresa.com, financeiro@empresa.com]",
    "mobile": "+5511999998888",
    "landline": "+551130304040",
    "country": "Brasil",
    "zipcode": "01311-000",
    "state": "SP",
    "city": "São Paulo",
    "address": "Av Paulista",
    "streetNumber": "1000",
    "neighborhood": "Bela Vista"
  },
  {
    "externalPlatform": "VTEX",
    "externalId": "CLI-1002",
    "firstName": "Ana Maria",
    "email": "[ana.maria@gmail.com]",
    "mobile": "+5521988887777",
    "state": "RJ",
    "city": "Rio de Janeiro"
  }
]')

echo "${RESPONSE}" | jq
