<?php
	
	//Echos errors to browser when run from address bar
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);


	//Including to make API and class library available
	include('openCage/AbstractGeocoder.php');
	include('openCage/Geocoder.php');

	//New instance of geocoder, passing in API key
    $geocoder = new openCage\Geocoder\Geocoder('b31118c454714ac5bff8f1535317f621');
	
	//Result of geocoder->geocode with request parameters passed in 
    $result = $geocoder->geocode($_REQUEST['q'],['language'=>$_REQUEST['lang']]);
    
	//Print to screen in JSON 
	echo json_encode($result["results"][0]["components"], JSON_UNESCAPED_UNICODE);
	
?>