import base64
import json
import urllib.request

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST'  # Set YOUR_API_HOST to the regional host from the servers section in the docs

body = {
  "page": 2,
  "page_size": 15,
  "start_date": "2022-12-12T00:00:00.000z",
  "end_date": "2022-12-14T00:00:00.000z",
  "direction": "all",
  "accounts": [
    "Account1",
    "Account2"
  ]
}

# HMAC authentication is also supported instead of Basic
auth = base64.b64encode(f'{api_key}:{api_secret}'.encode()).decode()
url = f'{api_host}/v2-preview/reporting/messages/metakeys'
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
