const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs
const accountId = 'TestAccount_ABC_0001';

const body = {
  "company_name": "Subaccount Name",
  "timezone": "Australia/Melbourne",
  "operating_country": "AU",
  "billing_type": "POSTPAID",
  "user": {
    "first_name": "First",
    "last_name": "Last",
    "email": "first.last@email.com",
    "phone": "+61411111111"
  }
};

// HMAC authentication is also supported instead of Basic
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v1/iam/reseller_customers`, {
  method: 'POST',
  headers: {
    Authorization: `Basic ${auth}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Account: accountId,
  },
  body: JSON.stringify(body),
});

console.log(response.status);
console.log(await response.text());
