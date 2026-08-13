require 'net/http'
require 'json'
require 'base64'
require 'uri'

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
api_host = 'YOUR_API_HOST' # Set YOUR_API_HOST to the regional host from the servers section in the docs
scheduled_id = "YOUR_SCHEDULED_ID"

body = {
  "label" => "Weekly Report",
  "schedule" => {
    "timezone" => "UTC",
    "cron_expression" => "0 0 * * * ? *",
    "type" => "cron"
  },
  "report" => {
    "period" => "THIS_WEEK",
    "timezone" => "Australia/Sydney",
    "direction" => "all",
    "source" => "+61555555555",
    "destination" => "+61555555555",
    "metadata_key" => "broadcastId",
    "metadata_value" => "ABC",
    "accounts" => [
      "Account1",
      "Account2"
    ],
    "status" => [
      "DELIVERED",
      "ENROUTE"
    ],
    "opt_out" => "true",
    "group_by" => [
      "DAY",
      "WEEK"
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
}

# HMAC authentication is also supported instead of Basic
uri = URI.parse("#{api_host}/v2-preview/reporting/summary/scheduled/#{scheduled_id}")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = uri.scheme == 'https'

request = Net::HTTP::Put.new(uri)
request['Authorization'] = 'Basic ' + Base64.strict_encode64("#{api_key}:#{api_secret}")
request['Accept'] = 'application/json'
request['Content-Type'] = 'application/json'
request.body = JSON.generate(body)

response = http.request(request)
puts response.code
puts response.body
