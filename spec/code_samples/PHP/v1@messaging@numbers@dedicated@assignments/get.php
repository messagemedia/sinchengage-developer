<?php
$apiKey = 'YOUR_API_KEY';
$apiSecret = 'YOUR_API_SECRET';
$apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs
$pageSize = 0;
$token = "YOUR_TOKEN";
$numberId = "YOUR_NUMBER_ID";
$matching = "YOUR_MATCHING";
$country = "YOUR_COUNTRY";
$type = "YOUR_TYPE";
$types = "YOUR_TYPES";
$classification = "YOUR_CLASSIFICATION";
$serviceTypes = "YOUR_SERVICE_TYPES";
$label = "YOUR_LABEL";
$sortBy = "TIMESTAMP";
$sortDirection = "ASCENDING";

// HMAC authentication is also supported instead of Basic
$url = $apiHost . '/v1/messaging/numbers/dedicated/assignments?page_size=' . $pageSize . '&token=' . $token . '&number_id=' . $numberId . '&matching=' . $matching . '&country=' . $country . '&type=' . $type . '&types=' . $types . '&classification=' . $classification . '&service_types=' . $serviceTypes . '&label=' . $label . '&sort_by=' . $sortBy . '&sort_direction=' . $sortDirection;
$headers = [
    'Authorization: Basic ' . base64_encode($apiKey . ':' . $apiSecret),
    'Accept: application/json',
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo $status, PHP_EOL;
echo $response, PHP_EOL;
