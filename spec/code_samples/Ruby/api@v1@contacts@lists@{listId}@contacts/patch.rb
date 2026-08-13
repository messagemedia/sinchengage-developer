require 'net/http'
require 'json'
require 'base64'
require 'uri'

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST' # Set YOUR_API_HOST to the regional host from the servers section in the docs
list_id = "YOUR_LIST_ID"

body = {
  "contactsToAddIds" => [
    "025e93d3-051b-43f9-b12e-4b5842228dee"
  ],
  "contactsToRemoveIds" => [
    "025e93d3-051b-43f9-b12e-4b5842228dee"
  ]
}

# HMAC authentication is also supported instead of Basic
uri = URI.parse("#{api_host}/api/v1/contacts/lists/#{list_id}/contacts")
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
