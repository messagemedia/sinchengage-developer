import base64
import json
import urllib.request

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST'  # Set YOUR_API_HOST to the regional host from the servers section in the docs

body = {
  "start_date": "2022-12-12T00:00:00.000z",
  "end_date": "2022-12-14T00:00:00.000z",
  "timezone": "Australia/Sydney",
  "direction": "all",
  "source": "+61555555555",
  "sources": [
    "+61555555555",
    "+614987654321"
  ],
  "destination": "+61555555555",
  "destinations": [
    "+61555555555",
    "+614987654321"
  ],
  "addresses": [
    "+61400000001",
    "+61400000002"
  ],
  "metadata_key": "broadcastId",
  "metadata_value": "ABC",
  "metadata_values": [
    "meta1",
    "meta2"
  ],
  "accounts": [
    "Account1",
    "Account2"
  ],
  "status": [
    "DELIVERED"
  ],
  "opt_out": "true",
  "message_format": [
    "MMS",
    "TTS"
  ],
  "fields": [
    {
      "name": "id",
      "display_name": "id"
    }
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
}

# HMAC authentication is also supported instead of Basic
auth = base64.b64encode(f'{api_key}:{api_secret}'.encode()).decode()
url = f'{api_host}/v2-preview/reporting/messages/async/detail'
headers = {
    'Authorization': f'Basic {auth}',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

data = json.dumps(body).encode('utf-8')
request = urllib.request.Request(url, data=data, headers=headers, method='POST')

with urllib.request.urlopen(request) as response:
    print(response.status)
    print(response.read().decode())
