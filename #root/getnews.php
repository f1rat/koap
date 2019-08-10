<?php
header('Access-Control-Allow-Origin: *');  
$url = 'https://www.kiralikotopark.com/';
$content = file_get_contents($url);
$first_step = explode( '<!-- Standard image post example -->' , $content );
$second_step = explode("</ul>" , $first_step[1] );
$secnd = $second_step[0];

preg_match_all('#\bhttps?://[^,\s()<>]+(?:\([\w\d]+\)|([^,[:punct:]\s]|/))#', $secnd, $match);
preg_match_all('/<a .*?>(.*?)<\/a>/',$secnd,$matches);
// echo $matches[1][6]; //output : Akki Khambhata


foreach($matches[1] as $key => $val)
{
echo $val."-";
}

$i = 0;
foreach($match[0] as $key => $value)
{
//echo $i;
$i=$i+1;
	echo $value."*";
}


?>