#!/usr/bin/env bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host from the servers section in the docs
SENDER_ADDRESS="EXAMPLE"
SENDER_ADDRESS_TYPE="ALPHANUMERIC"
USAGE_TYPE="ALPHANUMERIC"
INCLUDE_RELATED_ACCOUNTS="true"
EXPIRY_STATUS="EXPIRED"
PAGE_SIZE="0"
TOKEN="YOUR_TOKEN"

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X GET "${API_HOST}/v1/messaging/numbers/sender_address/addresses?sender_address=${SENDER_ADDRESS}&sender_address_type=${SENDER_ADDRESS_TYPE}&usage_type=${USAGE_TYPE}&include_related_accounts=${INCLUDE_RELATED_ACCOUNTS}&expiry_status=${EXPIRY_STATUS}&page_size=${PAGE_SIZE}&token=${TOKEN}" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json"
