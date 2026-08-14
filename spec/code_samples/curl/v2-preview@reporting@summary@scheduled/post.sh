#!/usr/bin/env bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host from the servers section in the docs

BODY=$(cat <<'EOF'
{
  "label": "Weekly Report",
  "schedule": {
    "timezone": "UTC",
    "cron_expression": "0 0 * * * ? *",
    "type": "cron"
  },
  "report": {
    "period": "THIS_WEEK",
    "timezone": "Australia/Sydney",
    "direction": "all",
    "source": "+61555555555",
    "destination": "+61555555555",
    "metadata_key": "broadcastId",
    "metadata_value": "ABC",
    "accounts": [
      "Account1",
      "Account2"
    ],
    "status": [
      "DELIVERED",
      "ENROUTE"
    ],
    "opt_out": "true",
    "group_by": [
      "DAY",
      "WEEK"
    ],
    "delivery_options": [
      {
        "delivery_type": "EMAIL",
        "delivery_addresses": [
          "email@example.com",
          "test@example.com"
        ],
        "delivery_format": "CSV"
      }
    ]
  },
  "metadata": [
    {
      "key": "myKey",
      "value": "myValue"
    },
    {
      "key": "anotherKey",
      "value": "anotherValue"
    }
  ]
}
EOF
)

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X POST "${API_HOST}/v2-preview/reporting/summary/scheduled" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d "${BODY}"
