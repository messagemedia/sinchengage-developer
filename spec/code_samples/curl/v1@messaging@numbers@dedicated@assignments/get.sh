#!/usr/bin/env bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host from the servers section in the docs
PAGE_SIZE="0"
TOKEN="YOUR_TOKEN"
NUMBER_ID="YOUR_NUMBER_ID"
MATCHING="YOUR_MATCHING"
COUNTRY="YOUR_COUNTRY"
TYPE="YOUR_TYPE"
TYPES="YOUR_TYPES"
CLASSIFICATION="YOUR_CLASSIFICATION"
SERVICE_TYPES="YOUR_SERVICE_TYPES"
LABEL="YOUR_LABEL"
SORT_BY="TIMESTAMP"
SORT_DIRECTION="ASCENDING"

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X GET "${API_HOST}/v1/messaging/numbers/dedicated/assignments?page_size=${PAGE_SIZE}&token=${TOKEN}&number_id=${NUMBER_ID}&matching=${MATCHING}&country=${COUNTRY}&type=${TYPE}&types=${TYPES}&classification=${CLASSIFICATION}&service_types=${SERVICE_TYPES}&label=${LABEL}&sort_by=${SORT_BY}&sort_direction=${SORT_DIRECTION}" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json"
