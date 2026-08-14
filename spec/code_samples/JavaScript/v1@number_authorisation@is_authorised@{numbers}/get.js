const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs
const numbers = 'YOUR_NUMBERS';

// HMAC authentication is also supported instead of Basic
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v1/number_authorisation/is_authorised/${numbers}`, {
  method: 'GET',
  headers: {
    Authorization: `Basic ${auth}`,
    Accept: 'application/json',
  },
});

console.log(response.status);
console.log(await response.text());
