require 'net/http'
require 'json'
require 'base64'
require 'uri'

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST' # Set YOUR_API_HOST to the regional host from the servers section in the docs
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
uri = URI.parse("#{api_host}/v1/messaging/numbers/dedicated/assignments?page_size=#{page_size}&token=#{token}&number_id=#{number_id}&matching=#{matching}&country=#{country}&type=#{type}&types=#{types}&classification=#{classification}&service_types=#{service_types}&label=#{label}&sort_by=#{sort_by}&sort_direction=#{sort_direction}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = uri.scheme == 'https'

request = Net::HTTP::Get.new(uri)
request['Authorization'] = 'Basic ' + Base64.strict_encode64("#{api_key}:#{api_secret}")
request['Accept'] = 'application/json'

response = http.request(request)
puts response.code
puts response.body
