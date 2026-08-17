const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs
const senderAddress = 'EXAMPLE';
const senderAddressType = 'ALPHANUMERIC';
const usageType = 'ALPHANUMERIC';
const includeRelatedAccounts = true;
const expiryStatus = 'EXPIRED';
const pageSize = 0;
const token = 'YOUR_TOKEN';

// HMAC authentication is also supported instead of Basic
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v1/messaging/numbers/sender_address/addresses?sender_address=${senderAddress}&sender_address_type=${senderAddressType}&usage_type=${usageType}&include_related_accounts=${includeRelatedAccounts}&expiry_status=${expiryStatus}&page_size=${pageSize}&token=${token}`, {
  method: 'GET',
  headers: {
    Authorization: `Basic ${auth}`,
    Accept: 'application/json',
  },
});

console.log(response.status);
console.log(await response.text());
