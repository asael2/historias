<?php
header("Content-type: application/json");
/*load feeds from Caracol.com */	
	$xml = simplexml_load_file('http://www.caracol.com.co/feed.aspx?id=PROG_320899');
	$json = json_encode($xml);
	echo $json;
?>