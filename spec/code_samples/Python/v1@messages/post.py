import base64
import json
import urllib.request

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST'  # Set YOUR_API_HOST to the regional host from the servers section in the docs

# Minimal SMS. For MMS, TTS and RCS payloads, see the Example dropdown or the message type pages in the docs.
body = {
  "messages": [
    {
      "content": "Your appointment is confirmed for Tuesday at 10am.",
      "destination_number": "+61491570156"
    }
  ]
}

# HMAC authentication is also supported instead of Basic
auth = base64.b64encode(f'{api_key}:{api_secret}'.encode()).decode()
url = f'{api_host}/v1/messages'
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
