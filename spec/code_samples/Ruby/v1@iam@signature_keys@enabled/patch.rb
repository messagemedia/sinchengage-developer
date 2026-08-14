require 'net/http'
require 'json'
require 'base64'
require 'uri'

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST' # Set YOUR_API_HOST to the regional host from the servers section in the docs

body = {
  "key_id" => "7ca628a8-08b0-4e42-aeb8-960b37049c31"
}

# HMAC authentication is also supported instead of Basic
uri = URI.parse("#{api_host}/v1/iam/signature_keys/enabled")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = uri.scheme == 'https'

request = Net::HTTP::Patch.new(uri)
request['Authorization'] = 'Basic ' + Base64.strict_encode64("#{api_key}:#{api_secret}")
request['Accept'] = 'application/json'
request['Content-Type'] = 'application/json'
request.body = JSON.generate(body)

response = http.request(request)
puts response.code
puts response.body
