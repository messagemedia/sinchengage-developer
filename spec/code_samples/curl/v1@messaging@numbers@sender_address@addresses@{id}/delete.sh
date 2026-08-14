#!/usr/bin/env bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host from the servers section in the docs
ID="YOUR_ID"
REASON="YOUR_REASON"

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X DELETE "${API_HOST}/v1/messaging/numbers/sender_address/addresses/${ID}?reason=${REASON}" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json"
