<?php
header('Access-Control-Allow-Origin: *');  
$url = 'https://www.kiralikotopark.com/';
$content = file_get_contents($url);
$first_step = explode( '<div class="carousel-inner">' , $content );
$second_step = explode("<!-- Controls -->" , $first_step[1] );
$secnd = $second_step[0];

preg_match_all('#\bhttps?://[^,\s()<>]+(?:\([\w\d]+\)|([^,[:punct:]\s]|/))#', $secnd, $match);

foreach($match[0] as $key => $value)
{
	echo $value."*";
}


?>