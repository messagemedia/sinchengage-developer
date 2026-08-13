#!/usr/bin/env bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host from the servers section in the docs

BODY=$(cat <<'EOF'
{
  "start_date": "2022-12-12T00:00:00.000z",
  "end_date": "2022-12-14T00:00:00.000z",
  "timezone": "Australia/Sydney",
  "direction": "all",
  "source": "+61555555555",
  "sources": [
    "+61555555555",
    "+614987654321"
  ],
  "destination": "+61555555555",
  "destinations": [
    "+61555555555",
    "+614987654321"
  ],
  "addresses": [
    "+61400000001",
    "+61400000002"
  ],
  "metadata_key": "broadcastId",
  "metadata_value": "ABC",
  "metadata_values": [
    "meta1",
    "meta2"
  ],
  "accounts": [
    "Account1",
    "Account2"
  ],
  "status": [
    "DELIVERED"
  ],
  "opt_out": "true",
  "message_format": [
    "MMS",
    "TTS"
  ],
  "fields": [
    {
      "name": "id",
      "display_name": "id"
    }
  ],
  "delivery_options": [
    {
      "delivery_type": "EMAIL",
      "delivery_addresses": [
        "email@example.com",
        "test@example.com"
      ],
      "delivery_format": "CSV"
    }
  ]
}
EOF
)

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X POST "${API_HOST}/v2-preview/reporting/messages/async/detail" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d "${BODY}"
