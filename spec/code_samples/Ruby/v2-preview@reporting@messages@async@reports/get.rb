require 'net/http'
require 'json'
require 'base64'
require 'uri'

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST' # Set YOUR_API_HOST to the regional host from the servers section in the docs
page_size = 0
page_token = "YOUR_PAGE_TOKEN"
report_name = "YOUR_REPORT_NAME"
status = "YOUR_STATUS"
start_date = "YOUR_START_DATE"
end_date = "YOUR_END_DATE"
sort_direction = "YOUR_SORT_DIRECTION"

# HMAC authentication is also supported instead of Basic
uri = URI.parse("#{api_host}/v2-preview/reporting/messages/async/reports?page_size=#{page_size}&page_token=#{page_token}&report_name=#{report_name}&status=#{status}&start_date=#{start_date}&end_date=#{end_date}&sort_direction=#{sort_direction}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = uri.scheme == 'https'

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Basic ' + Base64.strict_encode64("#{api_key}:#{api_secret}")
request['Accept'] = 'application/json'

response = http.request(request)
puts response.code
puts response.body
