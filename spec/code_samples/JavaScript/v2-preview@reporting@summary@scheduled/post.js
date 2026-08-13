const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs

const body = {
  "label": "Weekly Report",
  "schedule": {
    "timezone": "UTC",
    "cron_expression": "0 0 * * * ? *",
    "type": "cron"
  },
  "report": {
    "period": "THIS_WEEK",
    "timezone": "Australia/Sydney",
    "direction": "all",
    "source": "+61555555555",
    "destination": "+61555555555",
    "metadata_key": "broadcastId",
    "metadata_value": "ABC",
    "accounts": [
      "Account1",
      "Account2"
    ],
    "status": [
      "DELIVERED",
      "ENROUTE"
    ],
    "opt_out": "true",
    "group_by": [
      "DAY",
      "WEEK"
    ],
    "delivery_options": [
      {
        "delivery_type": "EMAIL",
        "delivery_addresses": [
          "email@example.com",
          "test@example.com"
        ],
        "delivery_format": "CSV"
      }
    ]
  },
  "metadata": [
    {
      "key": "myKey",
      "value": "myValue"
    },
    {
      "key": "anotherKey",
      "value": "anotherValue"
    }
  ]
};

// HMAC authentication is also supported instead of Basic
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v2-preview/reporting/summary/scheduled`, {
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
