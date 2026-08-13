#!/usr/bin/env bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host from the servers section in the docs

BODY=$(cat <<'EOF'
{
  "sender_address": "EXAMPLE",
  "sender_address_type": "ALPHANUMERIC",
  "usage_type": "ALPHANUMERIC",
  "destination_countries": [
    "AU"
  ],
  "reason": "{\n  \"useCase\":\"AUSTRALIAN_GOVERNMENT_AGENCY_OR_ENTITY\",\n  \"description\":\"bal bla\",\n  \"email\":\"xample@email.com\",\n  \"australianGovernmentAgencyOrEntityName\":\"bla bla\",\n  \"statement\":\"We are authorised to use the Sender ID on behalf of [full entity name of sender] with a valid use case.\"\n}\n",
  "label": "label"
}
EOF
)

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X POST "${API_HOST}/v1/messaging/numbers/sender_address/requests" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d "${BODY}"
