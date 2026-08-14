<?php
$apiKey = 'YOUR_API_KEY';
$apiSecret = 'YOUR_API_SECRET';
$apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs

$body = [
  'messages' => [
    [
      'callback_url' => 'https://my.callback.url.com',
      'content' => 'My first message',
      'destination_number' => '+61491570156',
      'delivery_report' => true,
      'format' => 'SMS',
      'message_expiry_timestamp' => '2016-11-03T11:49:02.807Z',
      'metadata' => [
        'key1' => 'value1',
        'key2' => 'value2'
      ],
      'scheduled' => '2016-11-03T11:49:02.807Z',
      'source_number' => '+61491570157',
      'source_number_type' => 'INTERNATIONAL'
    ],
    [
      'callback_url' => 'https://my.callback.url.com',
      'content' => 'My second message',
      'destination_number' => '+61491570158',
      'delivery_report' => true,
      'format' => 'MMS',
      'subject' => 'This is an MMS message',
      'media' => [
        'https://images.pexels.com/photos/1018350/pexels-photo-1018350.jpeg?cs=srgb&dl=architecture-buildings-city-1018350.jpg'
      ],
      'message_expiry_timestamp' => '2016-11-03T11:49:02.807Z',
      'metadata' => [
        'key1' => 'value1',
        'key2' => 'value2'
      ],
      'scheduled' => '2016-11-03T11:49:02.807Z',
      'source_number' => '+61491570159',
      'source_number_type' => 'INTERNATIONAL'
    ]
  ]
];

// HMAC authentication is also supported instead of Basic
$url = $apiHost . '/v1/messages';
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
