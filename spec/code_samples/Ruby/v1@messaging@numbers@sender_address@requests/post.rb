require 'net/http'
require 'json'
require 'base64'
require 'uri'

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST' # Set YOUR_API_HOST to the regional host from the servers section in the docs

body = {
  "sender_address" => "EXAMPLE",
  "sender_address_type" => "ALPHANUMERIC",
  "usage_type" => "ALPHANUMERIC",
  "destination_countries" => [
    "AU"
  ],
  "reason" => "{\n  \"useCase\":\"AUSTRALIAN_GOVERNMENT_AGENCY_OR_ENTITY\",\n  \"description\":\"bal bla\",\n  \"email\":\"xample@email.com\",\n  \"australianGovernmentAgencyOrEntityName\":\"bla bla\",\n  \"statement\":\"We are authorised to use the Sender ID on behalf of [full entity name of sender] with a valid use case.\"\n}\n",
  "label" => "label"
}

# HMAC authentication is also supported instead of Basic
uri = URI.parse("#{api_host}/v1/messaging/numbers/sender_address/requests")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = uri.scheme == 'https'

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Basic ' + Base64.strict_encode64("#{api_key}:#{api_secret}")
request['Accept'] = 'application/json'
request['Content-Type'] = 'application/json'
request.body = JSON.generate(body)

response = http.request(request)
puts response.code
puts response.body
