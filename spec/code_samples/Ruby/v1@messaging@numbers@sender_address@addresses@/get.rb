require 'net/http'
require 'json'
require 'base64'
require 'uri'

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST' # Set YOUR_API_HOST to the regional host from the servers section in the docs
sender_address = "EXAMPLE"
sender_address_type = "ALPHANUMERIC"
usage_type = "ALPHANUMERIC"
include_related_accounts = true
expiry_status = "EXPIRED"
page_size = 0
token = "YOUR_TOKEN"

# HMAC authentication is also supported instead of Basic
uri = URI.parse("#{api_host}/v1/messaging/numbers/sender_address/addresses/?sender_address=#{sender_address}&sender_address_type=#{sender_address_type}&usage_type=#{usage_type}&include_related_accounts=#{include_related_accounts}&expiry_status=#{expiry_status}&page_size=#{page_size}&token=#{token}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = uri.scheme == 'https'

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Basic ' + Base64.strict_encode64("#{api_key}:#{api_secret}")
request['Accept'] = 'application/json'

response = http.request(request)
puts response.code
puts response.body
