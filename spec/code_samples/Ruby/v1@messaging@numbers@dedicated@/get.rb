require 'net/http'
require 'json'
require 'base64'
require 'uri'

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST' # Set YOUR_API_HOST to the regional host from the servers section in the docs
country = "YOUR_COUNTRY"
matching = "YOUR_MATCHING"
page_size = 0
service_types = "YOUR_SERVICE_TYPES"
types = "YOUR_TYPES"
token = "YOUR_TOKEN"

# HMAC authentication is also supported instead of Basic
uri = URI.parse("#{api_host}/v1/messaging/numbers/dedicated/?country=#{country}&matching=#{matching}&page_size=#{page_size}&service_types=#{service_types}&types=#{types}&token=#{token}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = uri.scheme == 'https'

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Basic ' + Base64.strict_encode64("#{api_key}:#{api_secret}")
request['Accept'] = 'application/json'

response = http.request(request)
puts response.code
puts response.body
