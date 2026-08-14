import base64
import json
import urllib.request

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST'  # Set YOUR_API_HOST to the regional host from the servers section in the docs
scheduled_id = "YOUR_SCHEDULED_ID"

body = {
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
      "DELIVERED"
    ],
    "opt_out": "true",
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
  }
}

# HMAC authentication is also supported instead of Basic
auth = base64.b64encode(f'{api_key}:{api_secret}'.encode()).decode()
url = f'{api_host}/v2-preview/reporting/detail/scheduled/{scheduled_id}'
headers = {
    'Authorization': f'Basic {auth}',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

data = json.dumps(body).encode('utf-8')
request = urllib.request.Request(url, data=data, headers=headers, method='PUT')

with urllib.request.urlopen(request) as response:
    print(response.status)
    print(response.read().decode())
