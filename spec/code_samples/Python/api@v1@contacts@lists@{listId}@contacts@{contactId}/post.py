import base64
import json
import urllib.request

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST'  # Set YOUR_API_HOST to the regional host from the servers section in the docs
list_id = "YOUR_LIST_ID"
contact_id = "YOUR_CONTACT_ID"

# HMAC authentication is also supported instead of Basic
auth = base64.b64encode(f'{api_key}:{api_secret}'.encode()).decode()
url = f'{api_host}/api/v1/contacts/lists/{list_id}/contacts/{contact_id}'
headers = {
    'Authorization': f'Basic {auth}',
    'Accept': 'application/json',
}

request = urllib.request.Request(url, headers=headers, method='POST')

with urllib.request.urlopen(request) as response:
    print(response.status)
    print(response.read().decode())
