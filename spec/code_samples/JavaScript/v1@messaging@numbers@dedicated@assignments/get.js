const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs
const pageSize = 0;
const token = 'YOUR_TOKEN';
const numberId = 'YOUR_NUMBER_ID';
const matching = 'YOUR_MATCHING';
const country = 'YOUR_COUNTRY';
const type = 'YOUR_TYPE';
const types = 'YOUR_TYPES';
const classification = 'YOUR_CLASSIFICATION';
const serviceTypes = 'YOUR_SERVICE_TYPES';
const label = 'YOUR_LABEL';
const sortBy = 'TIMESTAMP';
const sortDirection = 'ASCENDING';

// HMAC authentication is also supported instead of Basic
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v1/messaging/numbers/dedicated/assignments?page_size=${pageSize}&token=${token}&number_id=${numberId}&matching=${matching}&country=${country}&type=${type}&types=${types}&classification=${classification}&service_types=${serviceTypes}&label=${label}&sort_by=${sortBy}&sort_direction=${sortDirection}`, {
  method: 'GET',
  headers: {
    Authorization: `Basic ${auth}`,
    Accept: 'application/json',
  },
});

console.log(response.status);
console.log(await response.text());
