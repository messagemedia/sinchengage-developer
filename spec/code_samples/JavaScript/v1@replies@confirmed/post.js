const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs

const body = {
  "reply_ids": [
    "011dcead-6988-4ad6-a1c7-6b6c68ea628d",
    "3487b3fa-6586-4979-a233-2d1b095c7718",
    "ba28e94b-c83d-4759-98e7-ff9c7edb87a1"
  ]
};

// HMAC authentication is also supported instead of Basic
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v1/replies/confirmed`, {
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
