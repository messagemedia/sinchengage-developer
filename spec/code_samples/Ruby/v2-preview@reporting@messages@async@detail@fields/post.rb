require 'net/http'
require 'json'
require 'base64'
require 'uri'

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST' # Set YOUR_API_HOST to the regional host from the servers section in the docs

body = {
  "page" => 1,
  "page_size" => 50,
  "start_date" => "2020-05-28T10:27:46.259Z",
  "end_date" => "2020-06-28T10:27:46.259Z"
}

# HMAC authentication is also supported instead of Basic
uri = URI.parse("#{api_host}/v2-preview/reporting/messages/async/detail/fields")
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
