<?
$parts = parse_url($url);
parse_str($parts['query'], $query);

$sMallID = 'FITCO';
$sClientID = 'IdZJS2JTKhxllIZnMpOGbA';
$sAuthCodeReceiveUrl = 'https://brummieowen.cafe24.com';
$sScope = 'mall.read_application,mall_write_application,mall.read_product,mall.read_category,mall.read_store';
$aState = array(
    'mall_id'    => $sMallID,
);

$sAuthCodeRequestUrl = "https://brummieowen.cafe24api.com/api/v2/oauth/authorize?";
$aRequestData = array(
    'response_type'=>'code',
    'client_id'=>$sClientID,
    'state'=> base64_encode(json_encode($aState)),
    'redirect_uri'=> $sAuthCodeReceiveUrl,
    'scope'=> $sScope,
);

$sUrl = $sAuthCodeRequestUrl . http_build_query($aRequestData);
$channel = curl_init();
curl_setopt($channel, CURLOPT_POST,				0);
curl_setopt($channel, CURLOPT_URL,				$sUrl);
curl_setopt($channel, CURLOPT_RETURNTRANSFER,	1);
$content = curl_exec($channel);


header('Location: ' . $sUrl);
exit;

?>



