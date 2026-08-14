const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs
const country = 'YOUR_COUNTRY';
const matching = 'YOUR_MATCHING';
const pageSize = 0;
const serviceTypes = 'YOUR_SERVICE_TYPES';
const types = 'YOUR_TYPES';
const token = 'YOUR_TOKEN';

// HMAC authentication is also supported instead of Basic
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v1/messaging/numbers/dedicated/?country=${country}&matching=${matching}&page_size=${pageSize}&service_types=${serviceTypes}&types=${types}&token=${token}`, {
  method: 'GET',
  headers: {
    Authorization: `Basic ${auth}`,
    Accept: 'application/json',
  },
});

console.log(response.status);
console.log(await response.text());
