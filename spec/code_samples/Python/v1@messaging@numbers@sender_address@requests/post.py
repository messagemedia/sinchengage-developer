import base64
import json
import urllib.request

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST'  # Set YOUR_API_HOST to the regional host from the servers section in the docs

body = {
  "sender_address": "EXAMPLE",
  "sender_address_type": "ALPHANUMERIC",
  "usage_type": "ALPHANUMERIC",
  "destination_countries": [
    "AU"
  ],
  "reason": "{\n  \"useCase\":\"AUSTRALIAN_GOVERNMENT_AGENCY_OR_ENTITY\",\n  \"description\":\"bal bla\",\n  \"email\":\"xample@email.com\",\n  \"australianGovernmentAgencyOrEntityName\":\"bla bla\",\n  \"statement\":\"We are authorised to use the Sender ID on behalf of [full entity name of sender] with a valid use case.\"\n}\n",
  "label": "label"
}

# HMAC authentication is also supported instead of Basic
auth = base64.b64encode(f'{api_key}:{api_secret}'.encode()).decode()
url = f'{api_host}/v1/messaging/numbers/sender_address/requests'
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
