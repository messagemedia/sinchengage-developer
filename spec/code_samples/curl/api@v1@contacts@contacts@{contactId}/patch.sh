#!/usr/bin/env bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host from the servers section in the docs
CONTACT_ID="YOUR_CONTACT_ID"

BODY=$(cat <<'EOF'
{
  "firstName": "Adam",
  "lastName": "Smith",
  "alias": "user1234",
  "dateOfBirth": "2022-08-18",
  "country": "US",
  "state": "CA",
  "location": "Sunset Blvd",
  "note": "Note",
  "channels": [
    {
      "channelId": "+15553456783",
      "type": "SMS",
      "subscriptionState": "UNSUBSCRIBED"
    }
  ],
  "lists": [
    {
      "id": "025e93d3-051b-43f9-b12e-4b5842228dee"
    }
  ],
  "customFields": [
    {
      "id": "025e93d3-051b-43f9-b12e-4b5842228dee",
      "value": "John"
    }
  ]
}
EOF
)

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X PATCH "${API_HOST}/api/v1/contacts/contacts/${CONTACT_ID}" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d "${BODY}"
