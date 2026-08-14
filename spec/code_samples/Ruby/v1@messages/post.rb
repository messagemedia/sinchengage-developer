require 'net/http'
require 'json'
require 'base64'
require 'uri'

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST' # Set YOUR_API_HOST to the regional host from the servers section in the docs

body = {
  "messages" => [
    {
      "callback_url" => "https://my.callback.url.com",
      "content" => "My first message",
      "destination_number" => "+61491570156",
      "delivery_report" => true,
      "format" => "SMS",
      "message_expiry_timestamp" => "2016-11-03T11:49:02.807Z",
      "metadata" => {
        "key1" => "value1",
        "key2" => "value2"
      },
      "scheduled" => "2016-11-03T11:49:02.807Z",
      "source_number" => "+61491570157",
      "source_number_type" => "INTERNATIONAL"
    },
    {
      "callback_url" => "https://my.callback.url.com",
      "content" => "My second message",
      "destination_number" => "+61491570158",
      "delivery_report" => true,
      "format" => "MMS",
      "subject" => "This is an MMS message",
      "media" => [
        "https://images.pexels.com/photos/1018350/pexels-photo-1018350.jpeg?cs=srgb&dl=architecture-buildings-city-1018350.jpg"
      ],
      "message_expiry_timestamp" => "2016-11-03T11:49:02.807Z",
      "metadata" => {
        "key1" => "value1",
        "key2" => "value2"
      },
      "scheduled" => "2016-11-03T11:49:02.807Z",
      "source_number" => "+61491570159",
      "source_number_type" => "INTERNATIONAL"
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
