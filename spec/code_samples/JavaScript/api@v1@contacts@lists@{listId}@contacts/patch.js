const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs
const listId = 'YOUR_LIST_ID';

const body = {
  "contactsToAddIds": [
    "025e93d3-051b-43f9-b12e-4b5842228dee"
  ],
  "contactsToRemoveIds": [
    "025e93d3-051b-43f9-b12e-4b5842228dee"
  ]
};

// HMAC authentication is also supported instead of Basic
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/api/v1/contacts/lists/${listId}/contacts`, {
  method: 'PATCH',
  headers: {
    Authorization: `Basic ${auth}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

console.log(response.status);
console.log(await response.text());
