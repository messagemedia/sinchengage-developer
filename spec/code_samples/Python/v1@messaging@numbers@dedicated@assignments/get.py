import base64
import json
import urllib.request

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST'  # Set YOUR_API_HOST to the regional host from the servers section in the docs
page_size = 0
token = "YOUR_TOKEN"
number_id = "YOUR_NUMBER_ID"
matching = "YOUR_MATCHING"
country = "YOUR_COUNTRY"
type = "YOUR_TYPE"
types = "YOUR_TYPES"
classification = "YOUR_CLASSIFICATION"
service_types = "YOUR_SERVICE_TYPES"
label = "YOUR_LABEL"
sort_by = "TIMESTAMP"
sort_direction = "ASCENDING"

# HMAC authentication is also supported instead of Basic
auth = base64.b64encode(f'{api_key}:{api_secret}'.encode()).decode()
url = f'{api_host}/v1/messaging/numbers/dedicated/assignments?page_size={page_size}&token={token}&number_id={number_id}&matching={matching}&country={country}&type={type}&types={types}&classification={classification}&service_types={service_types}&label={label}&sort_by={sort_by}&sort_direction={sort_direction}'
headers = {
    'Authorization': f'Basic {auth}',
    'Accept': 'application/json',
}

request = urllib.request.Request(url, headers=headers, method='GET')

with urllib.request.urlopen(request) as response:
    print(response.status)
    print(response.read().decode())
