#!/usr/bin/env bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host from the servers section in the docs
LIST_ID="YOUR_LIST_ID"

BODY=$(cat <<'EOF'
{
  "contactsToAddIds": [
    "025e93d3-051b-43f9-b12e-4b5842228dee"
  ],
  "contactsToRemoveIds": [
    "025e93d3-051b-43f9-b12e-4b5842228dee"
  ]
}
EOF
)

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X PATCH "${API_HOST}/api/v1/contacts/lists/${LIST_ID}/contacts" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d "${BODY}"
