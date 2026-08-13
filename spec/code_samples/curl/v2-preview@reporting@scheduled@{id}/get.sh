#!/usr/bin/env bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host from the servers section in the docs
SCHEDULED_ID="YOUR_SCHEDULED_ID"

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X GET "${API_HOST}/v2-preview/reporting/scheduled/${SCHEDULED_ID}" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json"
