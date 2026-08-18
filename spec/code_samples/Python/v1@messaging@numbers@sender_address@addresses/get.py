import base64
import json
import urllib.request

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST'  # Set YOUR_API_HOST to the regional host from the servers section in the docs
sender_address = "EXAMPLE"
sender_address_type = "ALPHANUMERIC"
usage_type = "ALPHANUMERIC"
include_related_accounts = True
expiry_status = "EXPIRED"
page_size = 0
token = "YOUR_TOKEN"

# HMAC authentication is also supported instead of Basic
auth = base64.b64encode(f'{api_key}:{api_secret}'.encode()).decode()
url = f'{api_host}/v1/messaging/numbers/sender_address/addresses?sender_address={sender_address}&sender_address_type={sender_address_type}&usage_type={usage_type}&include_related_accounts={include_related_accounts}&expiry_status={expiry_status}&page_size={page_size}&token={token}'
headers = {
    'Authorization': f'Basic {auth}',
    'Accept': 'application/json',
}

request = urllib.request.Request(url, headers=headers, method='GET')

with urllib.request.urlopen(request) as response:
    print(response.status)
    print(response.read().decode())
