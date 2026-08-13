const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs
const key = 'YOUR_KEY';
const value = 'YOUR_VALUE';
const url = 'YOUR_URL';
const recipient = 'YOUR_RECIPIENT';
const page = 0;
const pageSize = 0;

// HMAC authentication is also supported instead of Basic
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v1/reporting/links/summary?key=${key}&value=${value}&url=${url}&recipient=${recipient}&page=${page}&pageSize=${pageSize}`, {
  method: 'GET',
  headers: {
    Authorization: `Basic ${auth}`,
    Accept: 'application/json',
  },
});

console.log(response.status);
console.log(await response.text());
