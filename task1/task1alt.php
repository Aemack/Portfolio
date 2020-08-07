<?php
	
	$url="https://api.opencagedata.com/geocode/v1/json?q=".urlencode($_REQUEST['q'])."&key=b31118c454714ac5bff8f1535317f621"."&lang=".urlencode($_REQUEST['lang']);
	
	
	$curl = curl_init($url);

	curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/plain; charset=UTF-8'));
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	$json_result = curl_exec($curl);
	
	
	$r = json_decode($json_result, true);
	
	$results=$r["results"][0]["components"];
	
	
	
	
	
//	echo $results;
	echo json_encode($results, JSON_UNESCAPED_UNICODE);
	
	
?>