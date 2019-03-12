<?

$code = substr($_REQUEST['code'], 0, 22);
$mall_id = $_REQUEST['mall_id'];

$username = 'IdZJS2JTKhxllIZnMpOGbA';
$password = 'hlBeErddcqmMxTs21x9aEF';

$url = 'https://'.$mall_id.'.cafe24api.com/api/v2/oauth/token';

$param = array(
    'grant_type'   => 'authorization_code'
    ,'code'   => $code
    ,'redirect_uri' => 'https://jgyuity.cafe24.com/fitco/php/token_response.php'
);
$header = array( 
    'Content-Type: application/x-www-form-urlencoded', 
    'Authorization: Basic '. base64_encode($username.":".$password) 
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($param));
curl_setopt ($ch, CURLOPT_POSTFIELDSIZE, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

$result = curl_exec($ch);
$result = json_decode($result,true);
echo $result['access_token'];

curl_close($ch);
?>