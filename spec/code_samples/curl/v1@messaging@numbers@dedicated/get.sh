#!/usr/bin/env bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host from the servers section in the docs
COUNTRY="YOUR_COUNTRY"
MATCHING="YOUR_MATCHING"
PAGE_SIZE="0"
SERVICE_TYPES="YOUR_SERVICE_TYPES"
TYPES="YOUR_TYPES"
TOKEN="YOUR_TOKEN"

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X GET "${API_HOST}/v1/messaging/numbers/dedicated?country=${COUNTRY}&matching=${MATCHING}&page_size=${PAGE_SIZE}&service_types=${SERVICE_TYPES}&types=${TYPES}&token=${TOKEN}" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json"
