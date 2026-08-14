const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs

const body = {
  "sender_address": "EXAMPLE",
  "sender_address_type": "ALPHANUMERIC",
  "usage_type": "ALPHANUMERIC",
  "destination_countries": [
    "AU"
  ],
  "reason": "{\n  \"useCase\":\"AUSTRALIAN_GOVERNMENT_AGENCY_OR_ENTITY\",\n  \"description\":\"bal bla\",\n  \"email\":\"xample@email.com\",\n  \"australianGovernmentAgencyOrEntityName\":\"bla bla\",\n  \"statement\":\"We are authorised to use the Sender ID on behalf of [full entity name of sender] with a valid use case.\"\n}\n",
  "label": "label"
};

// HMAC authentication is also supported instead of Basic
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v1/messaging/numbers/sender_address/requests`, {
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
