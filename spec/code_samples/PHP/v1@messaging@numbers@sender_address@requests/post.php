<?php
$apiKey = 'YOUR_API_KEY';
$apiSecret = 'YOUR_API_SECRET';
$apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs

$body = [
  'sender_address' => 'EXAMPLE',
  'sender_address_type' => 'ALPHANUMERIC',
  'usage_type' => 'ALPHANUMERIC',
  'destination_countries' => [
    'AU'
  ],
  'reason' => '{
  "useCase":"AUSTRALIAN_GOVERNMENT_AGENCY_OR_ENTITY",
  "description":"bal bla",
  "email":"xample@email.com",
  "australianGovernmentAgencyOrEntityName":"bla bla",
  "statement":"We are authorised to use the Sender ID on behalf of [full entity name of sender] with a valid use case."
}
',
  'label' => 'label'
];

// HMAC authentication is also supported instead of Basic
$url = $apiHost . '/v1/messaging/numbers/sender_address/requests';
$headers = [
    'Authorization: Basic ' . base64_encode($apiKey . ':' . $apiSecret),
    'Accept: application/json',
    'Content-Type: application/json',
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));

$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo $status, PHP_EOL;
echo $response, PHP_EOL;
