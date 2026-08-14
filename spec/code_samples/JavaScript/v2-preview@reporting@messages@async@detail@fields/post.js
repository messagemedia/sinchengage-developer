const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs

const body = {
  "page": 1,
  "page_size": 50,
  "start_date": "2020-05-28T10:27:46.259Z",
  "end_date": "2020-06-28T10:27:46.259Z"
};

// HMAC authentication is also supported instead of Basic
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v2-preview/reporting/messages/async/detail/fields`, {
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
