const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs

const body = {
  "start_date": "2022-12-12T01:01:01.001z",
  "end_date": "2022-12-14T01:01:01.001z",
  "timezone": "Australia/Sydney",
  "direction": "all",
  "source": "+61555555555",
  "sources": [
    "+61555555555",
    "+614987654321"
  ],
  "destination": "+61555555555",
  "destinations": [
    "+61555555555",
    "+614987654321"
  ],
  "metadata_key": "broadcastId",
  "metadata_value": "ABC",
  "metadata_values": [
    "meta1",
    "meta2"
  ],
  "accounts": [
    "account1",
    "account2"
  ],
  "status": [
    "DELIVERED",
    "ENROUTE"
  ],
  "opt_out": "true",
  "channels": [
    "SMS",
    "WHATSAPP"
  ],
  "group_by": [
    "WEEK",
    "ACCOUNT"
  ]
};

// HMAC authentication is also supported instead of Basic
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v2-preview/reporting/messages/insights`, {
  method: 'POST',
  headers: {
    Authorization: `Basic ${auth}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

console.log(response.status);
console.log(await response.text());
