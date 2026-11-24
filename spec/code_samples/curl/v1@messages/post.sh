#!/usr/bin/env bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host from the servers section in the docs

# Minimal SMS. For MMS, TTS and RCS payloads, see the Example dropdown or the message type pages in the docs.
BODY=$(cat <<'EOF'
{
  "messages": [
    {
      "content": "Your appointment is confirmed for Tuesday at 10am.",
      "destination_number": "+61491570156"
    }
  ]
}
EOF
)

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X POST "${API_HOST}/v1/messages" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d "${BODY}"
