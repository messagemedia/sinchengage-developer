import base64
import json
import urllib.request

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST'  # Set YOUR_API_HOST to the regional host from the servers section in the docs
account_id = 'TestAccount_ABC_0001'

body = {
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

# HMAC authentication is also supported instead of Basic
auth = base64.b64encode(f'{api_key}:{api_secret}'.encode()).decode()
url = f'{api_host}/v1/iam/reseller_customers'
headers = {
    'Authorization': f'Basic {auth}',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Account': account_id,
}

data = json.dumps(body).encode('utf-8')
request = urllib.request.Request(url, data=data, headers=headers, method='POST')

with urllib.request.urlopen(request) as response:
    print(response.status)
    print(response.read().decode())
