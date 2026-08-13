import base64
import json
import urllib.request

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST'  # Set YOUR_API_HOST to the regional host from the servers section in the docs
key = "YOUR_KEY"
value = "YOUR_VALUE"
url = "YOUR_URL"
recipient = "YOUR_RECIPIENT"
page = 0
page_size = 0

# HMAC authentication is also supported instead of Basic
auth = base64.b64encode(f'{api_key}:{api_secret}'.encode()).decode()
url = f'{api_host}/v1/reporting/links/summary?key={key}&value={value}&url={url}&recipient={recipient}&page={page}&pageSize={page_size}'
headers = {
    'Authorization': f'Basic {auth}',
    'Accept': 'application/json',
}

request = urllib.request.Request(url, headers=headers, method='GET')

with urllib.request.urlopen(request) as response:
    print(response.status)
    print(response.read().decode())
