require 'net/http'
require 'json'
require 'base64'
require 'uri'

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST' # Set YOUR_API_HOST to the regional host from the servers section in the docs

body = {
  "start_date" => "2022-12-12T00:00:00.000z",
  "end_date" => "2022-12-14T00:00:00.000z",
  "timezone" => "Australia/Sydney",
  "direction" => "all",
  "source" => "+61555555555",
  "sources" => [
    "+61555555555",
    "+614987654321"
  ],
  "destination" => "+61555555555",
  "destinations" => [
    "+61555555555",
    "+614987654321"
  ],
  "addresses" => [
    "+61400000001",
    "+61400000002"
  ],
  "metadata_key" => "broadcastId",
  "metadata_value" => "ABC",
  "metadata_values" => [
    "meta1",
    "meta2"
  ],
  "accounts" => [
    "Account1",
    "Account2"
  ],
  "status" => [
    "DELIVERED"
  ],
  "opt_out" => "true",
  "message_format" => [
    "MMS",
    "TTS"
  ],
  "fields" => [
    {
      "name" => "id",
      "display_name" => "id"
    }
  ],
  "delivery_options" => [
    {
      "delivery_type" => "EMAIL",
      "delivery_addresses" => [
        "email@example.com",
        "test@example.com"
      ],
      "delivery_format" => "CSV"
    }
  ]
}

# HMAC authentication is also supported instead of Basic
uri = URI.parse("#{api_host}/v2-preview/reporting/messages/async/detail")
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
