import base64
import json
import urllib.request

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST'  # Set YOUR_API_HOST to the regional host from the servers section in the docs
list_id = "YOUR_LIST_ID"

body = {
  "name": "My list",
  "alias": "List1"
}

# HMAC authentication is also supported instead of Basic
auth = base64.b64encode(f'{api_key}:{api_secret}'.encode()).decode()
url = f'{api_host}/api/v1/contacts/lists/{list_id}'
headers = {
    'Authorization': f'Basic {auth}',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

data = json.dumps(body).encode('utf-8')
request = urllib.request.Request(url, data=data, headers=headers, method='PATCH')

with urllib.request.urlopen(request) as response:
    print(response.status)
    print(response.read().decode())
