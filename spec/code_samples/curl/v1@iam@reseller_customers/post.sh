#!/usr/bin/env bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host from the servers section in the docs
ACCOUNT_ID="TestAccount_ABC_0001"

BODY=$(cat <<'EOF'
{
  "company_name": "Subaccount Name",
  "timezone": "Australia/Melbourne",
  "operating_country": "AU",
  "billing_type": "POSTPAID",
  "user": {
    "first_name": "First",
    "last_name": "Last",
    "email": "first.last@email.com",
    "phone": "+61411111111"
  }
}
EOF
)

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X POST "${API_HOST}/v1/iam/reseller_customers" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Account: ${ACCOUNT_ID}" \
  -d "${BODY}"
