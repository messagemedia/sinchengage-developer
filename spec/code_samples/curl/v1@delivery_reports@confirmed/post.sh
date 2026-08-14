#!/usr/bin/env bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host from the servers section in the docs

BODY=$(cat <<'EOF'
{
  "delivery_report_ids": [
    "011dcead-6988-4ad6-a1c7-6b6c68ea628d",
    "3487b3fa-6586-4979-a233-2d1b095c7718",
    "ba28e94b-c83d-4759-98e7-ff9c7edb87a1"
  ]
}
EOF
)

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X POST "${API_HOST}/v1/delivery_reports/confirmed" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d "${BODY}"
