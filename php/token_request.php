<?
$username = 'Tfrj19ZXMKoPPW3ndxigAD';
$password = 'RcGVBeXWHC1TpKwfy6koWN';

$url = 'https://brummieowen.cafe24api.com/api/v2/oauth/token';

$param = array(
    'grant_type'   => 'authorization_code'
    ,'code'   => 'qNf1ujemZkCzu2d0bmlKYL'
    ,'redirect_uri' => 'https://jgyuity.cafe24.com/fitco/php/token_response.php'
);

$header = array( 'Charset=utf-8','Accept: application/json', 'Content-Type: application/x-www-form-urlencoded', 'Authorization: Basic '. base64_encode($username.":".$password) );

$ch = curl_init();
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($param));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

$result = curl_exec($ch);
$result = json_decode($result,true);
print_r($result);
curl_close($ch);

?>
