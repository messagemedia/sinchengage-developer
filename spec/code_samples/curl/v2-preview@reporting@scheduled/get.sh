#!/usr/bin/env bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host from the servers section in the docs
PAGE_SIZE="0"
PAGE_TOKEN="YOUR_PAGE_TOKEN"

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X GET "${API_HOST}/v2-preview/reporting/scheduled?page_size=${PAGE_SIZE}&page_token=${PAGE_TOKEN}" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json"
