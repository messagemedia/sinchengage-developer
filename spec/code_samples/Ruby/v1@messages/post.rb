require 'net/http'
require 'json'
require 'base64'
require 'uri'

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST' # Set YOUR_API_HOST to the regional host from the servers section in the docs

# Minimal SMS. For MMS, TTS and RCS payloads, see the Example dropdown or the message type pages in the docs.
body = {
  "messages" => [
    {
      "content" => "Your appointment is confirmed for Tuesday at 10am.",
      "destination_number" => "+61491570156"
    }
  ]
}

# HMAC authentication is also supported instead of Basic
uri = URI.parse("#{api_host}/v1/messages")
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
