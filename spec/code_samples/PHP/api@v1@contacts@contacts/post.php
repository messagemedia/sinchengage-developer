<?php
$apiKey = 'YOUR_API_KEY';
$apiSecret = 'YOUR_API_SECRET';
$apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs

$body = [
  'firstName' => 'Adam',
  'lastName' => 'Smith',
  'alias' => 'user1234',
  'dateOfBirth' => '2022-08-18',
  'country' => 'US',
  'state' => 'CA',
  'location' => 'Sunset Blvd',
  'note' => 'Note',
  'channels' => [
    [
      'channelId' => '+15553456783',
      'type' => 'SMS',
      'subscriptionState' => 'UNSUBSCRIBED'
    ]
  ],
  'lists' => [
    [
      'id' => '025e93d3-051b-43f9-b12e-4b5842228dee'
    ]
  ],
  'customFields' => [
    [
      'id' => '025e93d3-051b-43f9-b12e-4b5842228dee',
      'value' => 'John'
    ]
  ]
];

// HMAC authentication is also supported instead of Basic
$url = $apiHost . '/api/v1/contacts/contacts';
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
