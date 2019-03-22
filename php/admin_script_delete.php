<?

$access_token = $_REQUEST['access_token'];
$mall_id = $_REQUEST['mall_id'];
$script_no = $_REQUEST['script_no'];

$url = 'https://'.$mall_id.'.cafe24api.com/api/v2/admin/scripttags/'.$script_no;

$header = array( 'Content-Type: application/json', 'Authorization: Bearer '.$access_token );

$ch = curl_init();
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($ch);
$result = json_decode($result,true);
print_r($result);
// echo $result;

curl_close($ch);