import base64
import json
import urllib.request

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST'  # Set YOUR_API_HOST to the regional host from the servers section in the docs
page_size = 0
page_token = "YOUR_PAGE_TOKEN"
report_name = "YOUR_REPORT_NAME"
status = "YOUR_STATUS"
start_date = "YOUR_START_DATE"
end_date = "YOUR_END_DATE"
sort_direction = "YOUR_SORT_DIRECTION"

# HMAC authentication is also supported instead of Basic
auth = base64.b64encode(f'{api_key}:{api_secret}'.encode()).decode()
url = f'{api_host}/v2-preview/reporting/messages/async/reports?page_size={page_size}&page_token={page_token}&report_name={report_name}&status={status}&start_date={start_date}&end_date={end_date}&sort_direction={sort_direction}'
headers = {
    'Authorization': f'Basic {auth}',
    'Accept': 'application/json',
}

request = urllib.request.Request(url, headers=headers, method='GET')

with urllib.request.urlopen(request) as response:
    print(response.status)
    print(response.read().decode())
