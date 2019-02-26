<?
$access_token = '4AAqBaZFHVAgoGolVcYBEA';

$url = 'https://brummieowen.cafe24api.com/api/v2/admin/scripttags';

$header = array( 'Content-Type: application/json', 'Authorization: Bearer '. $access_token );



$param = array (
  "shop_no" => 1,
  "request" => array (
		"client_id" => "Tfrj19ZXMKoPPW3ndxigAD",
		"src" => "https://jgyuity.cafe24.com/fitco/js/script.js",
		"display_location" => array(
			"PRODUCT_DETAIL"
		)
   )
);

print_r($param);
echo "<br><br>";

$ch = curl_init();
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
//curl_setopt($ch, CURLOPT_POST, 0);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($param));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);


$result = curl_exec($ch);
$result = json_decode($result,true);
print_r($result);
curl_close($ch);

/*
$mallId = 'sunbitelapitf';

$aFields = array (
  "request" => array (
                "client_id" => "dQMK4uutDBDhog762OLMwA",
                "src" => 
		"https://floud.co.kr/b2b_orderlist/js/orderlist.js",
                "display_location" => "PRODUCT_DETAIL"
   )
);

$oCurl = curl_init(); 
curl_setopt_array($oCurl, array( 
CURLOPT_URL => sprintf('https://%s.cafe24api.com/api/v2/admin/scripttags', $mallId), 
CURLOPT_POST => 1, 
CURLOPT_POSTFIELDS => json_encode($aFields), 
CURLOPT_RETURNTRANSFER => true, 
CURLOPT_HTTPHEADER => array( 
'Authorization: Bearer ' . $access_token, 
"Content-Type: application/json" 
) 
));
 
$sResponse = curl_exec($oCurl); 
$json_result = json_decode($sResponse); 

echo '<pre>'; 
print_r($json_result); 
*/

?>
