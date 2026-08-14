#!/usr/bin/env bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host from the servers section in the docs
PAGE_SIZE="0"
PAGE_TOKEN="YOUR_PAGE_TOKEN"
REPORT_NAME="YOUR_REPORT_NAME"
STATUS="YOUR_STATUS"
START_DATE="YOUR_START_DATE"
END_DATE="YOUR_END_DATE"
SORT_DIRECTION="YOUR_SORT_DIRECTION"

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X GET "${API_HOST}/v2-preview/reporting/messages/async/reports?page_size=${PAGE_SIZE}&page_token=${PAGE_TOKEN}&report_name=${REPORT_NAME}&status=${STATUS}&start_date=${START_DATE}&end_date=${END_DATE}&sort_direction=${SORT_DIRECTION}" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json"
