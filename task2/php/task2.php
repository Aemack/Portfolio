<?php
    
    $url="http://api.geonames.org/countryInfoJSON?formatted=true&country=".$_REQUEST['country']."&lang=".$_REQUEST['lang']."&username=aemac";
    
    
    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: text/plain; charset=UTF-8'));
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	$json_result = curl_exec($curl);
    
    
    $r = json_decode($json_result, true);
    
    $result = $r["geonames"][0];

    //	echo $results;
    echo json_encode($result, JSON_UNESCAPED_UNICODE);

?>