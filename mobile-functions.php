<?php

//////////////////////////////////////////////////////
/*                EDIT TO YOUR NEEDS                //
//   												//
// Use the $to_remove variable below to prevent     //
// selected fields from displaying in the app		//
// 			 										//
// Example : 										//
// $to_remove = array('2','3','4');					*/
//													//
$to_remove = array('6','78','10','17','38','52','79');
//													//
// 						Edit END		    		//
//////////////////////////////////////////////////////

header('Access-Control-Allow-Origin: *');  
$postdata = htmlspecialchars($_GET["action"]);
$language = htmlspecialchars($_GET["language"]);
//Databse string
$con = new mysqli("localhost","kiraliko_4r376fg",";xlUeQuUB1Hc","kiraliko_d1b9s3i5k");
// Check connection
if ($con->connect_error)
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
if (!mysqli_set_charset($con, "utf8")) {
    printf("Error loading character set utf8: %s\n", mysqli_error($con));
    exit();
} else {
    console.log("Current character set: %s\n", mysqli_character_set_name($con));
}

// Get slideshow
if ($postdata == 'getSlides') {
$sql = "SELECT * FROM slideshow ORDER BY id";
$result = $con->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
	$repo_id = $row["repository_id"];
    }
} else {
    echo "0 results";
}
	$sql2 = "SELECT filename FROM file WHERE repository_id='$repo_id' ORDER BY id";
	$result2 = $con->query($sql2);
	if ($result2->num_rows > 0) {
    while($row2 = $result2->fetch_assoc()) {
	echo json_encode($row2[filename]);
    }
	}
	else { echo "no slides"; }
	mysqli_close($con);
} 

// GET FAQS
else if ($postdata == 'getFaqs') {
$data = Array();
$sql = "SELECT * FROM `qa_lang` WHERE `language_id`='1'";
$result = $con->query($sql);
if ($result->num_rows > 0) {
while($row = $result->fetch_assoc()) {
	$data[] = $row;
}
echo json_encode($data);
}
}


// Get single property data
else if ($postdata == 'getSinglePropertyData') {
$propertyID = htmlspecialchars($_GET["propertyID"]);
//$language = htmlspecialchars($_GET["language"]);
$language = "1";    
$sql = "SELECT property.gps,property.lat,property.lng,property.date,property.address,property.repository_id,property.is_featured,property.image_filename,property.image_repository,property_lang.json_object FROM property LEFT JOIN property_lang ON '$propertyID' = property_lang.property_id AND property_lang.language_id = '$language' WHERE property.id='$propertyID'";
$result = $con->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
	$data[] = $row;
    }
$machinetype = json_decode($data[0]["json_object"], true); 
foreach ($machinetype as $key => $value) {
    if (empty($value)) {
    unset($machinetype[$key]);
    } else {
    $varo[] = (int) filter_var($key, FILTER_SANITIZE_NUMBER_INT);
    }
	}
$in = sort($varo, SORT_NUMERIC);
$in = '(' . implode(',', $varo) . ')';
$data[3] = $in;
$sql2 = "SELECT `option` FROM `option_lang` WHERE `option_id` IN $in AND `language_id`=$language ORDER BY `option_id` ASC";
$result2 = $con->query($sql2);
$i = 0;
if ($result2->num_rows > 0) {
while($row2 = $result2->fetch_assoc()) {
	$data[2][] = $row2;
    } 
} else { $data[2] = "no result"; }

if (empty($machinetype)) {
$data[1] = "empty array";
}    
else {
$data[1] = $varo;
}    
    

$data[5] = array_diff($varo, $to_remove);

     
    
    echo json_encode($data);
}
else {
    echo json_encode("No property with given ID");
	}     
}      
    
    
// Get blog entries
else if ($postdata == 'getLatestNews') {
$newsid = htmlspecialchars($_GET["newsid"]);
if ($newsid == ""){
$sql = "SELECT id,image_filename FROM page WHERE type='MODULE_NEWS_POST' ORDER BY id";
} else {
$sql = "SELECT id,image_filename FROM page WHERE id='$newsid'";
}
$result = $con->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
	$pageid[] = $row["id"];
	$photoid[] = $row["image_filename"];
    }
$list = implode( ", ", $pageid );
$sql2 = "SELECT title,body FROM page_lang WHERE page_id IN (".implode(',', $pageid).") AND language_id='$language' ORDER BY page_id";
$result2 = $con->query($sql2);
if ($result2->num_rows > 0) {
while($row2 = $result2->fetch_assoc()) {
	$title[] = $row2["title"];
	$body[] = $row2["body"];
}
}
$blog = array_merge($pageid,$photoid,$title,$body);
echo json_encode($blog);
}
else {
    echo json_encode("no news");
	}     
} 


//Get categories list
else if ($postdata == 'getCatListing') {
$language = htmlspecialchars($_GET["language"]);
$sql = "SELECT `values` FROM `option_lang` WHERE option_id=2 AND language_id=$language";
$result = $con->query($sql);
if ($result->num_rows > 0) {
while($row = $result->fetch_assoc()) {
	echo json_encode($row);
}
} else { echo json_encode("no-result");}
}


//Get machines under specific category
else if ($postdata == 'getCatMachines') {
$mtype = htmlspecialchars($_GET["mtype"]);
$lang = htmlspecialchars($_GET["language"]);
$data = Array();
$sql = "SELECT property_lang.property_id,property_lang.json_object,property_lang.field_36_int,property_lang.field_37_int,property_lang.field_55_int,property_lang.field_82_int, property.image_filename FROM property_lang LEFT JOIN property ON property.id = property_lang.property_id WHERE field_2='$mtype' AND language_id='$lang' AND property.is_activated='1'";
$result = $con->query($sql);
if ($result->num_rows > 0) {
while($row = $result->fetch_assoc()) {
	$data[] = $row;
}
echo json_encode($data);
} else { echo json_encode("no-result");}
}


//Update user data
else if ($postdata == 'updateUserData') {

$token = htmlspecialchars($_GET["token"]);
$namesurname = htmlspecialchars($_GET["name_surname"]);
$inputaddress = htmlspecialchars($_GET["input_address"]);
$username = htmlspecialchars($_GET["username"]);
$userbio = htmlspecialchars($_GET["userbio"]);
$phone = htmlspecialchars($_GET["phone"]);
$useremail = htmlspecialchars($_GET["useremail"]);

$sql = "SELECT * FROM token_api WHERE username='$username' AND token='$token'";
$result = $con->query($sql);
if ($result->num_rows > 0) {
echo json_encode("Authenticated");
$sql2 = "UPDATE `user` SET `username`='$username', `name_surname`='$namesurname', `address`='$inputaddress', `description`='$userbio', `phone`='$phone' WHERE `mail`='$useremail'";
$con->query($sql2);
printf("Affected rows (UPDATE): %d\n", $con->affected_rows);
} 
else { echo json_encode("no-result");
}
}


//Do detailed search
else if ($postdata == 'detailedSearch') {
$machineType = htmlspecialchars($_GET["machineType"]);
$machineStatus = htmlspecialchars($_GET["machineStatus"]);
$priceMin = htmlspecialchars($_GET["priceMin"]);
$priceMax = htmlspecialchars($_GET["priceMax"]);
$keyword = htmlspecialchars($_GET["keyword"]);
$data = Array();    
$sql = "SELECT property_lang.property_id,property_lang.json_object,property_lang.field_37_int,property_lang.field_55_int, property.image_filename FROM property_lang LEFT JOIN property ON property.id = property_lang.property_id";
    
    if ($priceMin == null) {
        $priceMin = "0";
    }
    if ($priceMax == null) {
        $priceMax = "9999999999";
    }
    
    $conditions = array();
    $conditions[] = "property.is_activated='1'";
    
    if(! empty($machineStatus)) {
      $conditions[] = "property_lang.field_2=\"$machineStatus\"";
    }
    if(! empty($keyword)) {
      $conditions[] = "property.search_values LIKE '%$keyword%'";
    }
     $conditions[] = "property_lang.field_37_int BETWEEN $priceMin AND $priceMax";

  /*
     $conditions[] = "JSON_EXTRACT(property_lang.json_object, 'field_81') BETWEEN $modelMin AND $modelMax";
  */
    
    if (count($conditions) > 0) {
      $sql .= " WHERE " . implode(' AND ', $conditions);
    }  
    //echo json_encode($sql);
    $result = $con->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
	$data[] = $row;
        }
        echo json_encode($data);
    } 
    else { echo json_encode("no-result");}


}


//Get a specific user's listings
else if ($postdata == 'getUserListing') {
$userid = htmlspecialchars($_GET["user"]);
$lang = htmlspecialchars($_GET["language"]);
$dat = Array();
$dato = Array();
$data = Array();
$sq = "SELECT `id` FROM `user` WHERE username='$userid'";
    $resul = $con->query($sq);
    if ($resul->num_rows > 0) {
        while ($row = $resul->fetch_assoc()){
            $dat = $row;
        }
    }
$hesql = "SELECT `property_id` FROM `property_user` WHERE `user_id` = $dat[id]";
$resulto = $con->query($hesql);

    if ($resulto->num_rows > 0) {
        while ($rowel = $resulto->fetch_assoc()){ $dato[] = $rowel; }
        foreach ($dato as $value) {
 $sql = "SELECT property_lang.property_id,property_lang.json_object,property_lang.field_36_int,property_lang.field_37_int,property_lang.field_55_int,property_lang.field_82_int, property.image_filename FROM property_lang LEFT JOIN property ON property.id = property_lang.property_id WHERE property_lang.property_id = $value[property_id] AND property_lang.language_id='1' AND property.is_activated='1'";
$result = $con->query($sql);
if ($result->num_rows > 0) { while($row = $result->fetch_assoc()) { $data[] = $row; }  }
}
    echo json_encode($data);
    } else { echo json_encode("no-result");}
}


//Get user's mini avatar
else if ($postdata == 'getUserMiniAvatar') {
$userid = htmlspecialchars($_GET["user"]);
$data = Array();

$sql = "SELECT `image_user_filename` FROM `user` WHERE `username`='$userid'";
$result = $con->query($sql);
if ($result->num_rows > 0) {
while($row = $result->fetch_assoc()) {
	$data[] = $row;
}
echo json_encode($data);
}

/*
//$userid = '"'.$userid.'"';
$s = "SELECT `user_id` FROM `token_api` WHERE `token`=$userid";
echo $s;
echo "------";
$resu = $con->query($s);
    if ($resu->num_rows > 0) {
    echo json_encode($resu);
    echo "..........".$resu;
    $useridn = $resu;
    } else { echo "//noresult//";}
$sq = "SELECT `image_user_filename` FROM `user` WHERE `id`=".$useridn;
echo $sq;
$resul = $con->query($sq);
    if ($resul->num_rows > 0) {
    echo "json";
    echo json_encode($resul);
	echo "resul";
    echo $resul;
    } else {
    echo "nopic";
    }
    */
}


//Get all locations
else if ($postdata == 'getLocations') {
$swlat = htmlspecialchars($_GET["swlat"]);
$swlong = htmlspecialchars($_GET["swlong"]);
$nelat = htmlspecialchars($_GET["nelat"]);
$nelong = htmlspecialchars($_GET["nelong"]);
$dat = Array();
$sq = "SELECT id, gps, address FROM `property`";
    $resul = $con->query($sq);
    if ($resul->num_rows > 0) {
        while ($row = $resul->fetch_assoc()){
            $item = $row[gps];
            $sitem = $str_arr = preg_split ("/\,/", $item);
            $itemlon = $sitem[1];
            $itemlat = $sitem[0];


            if ($swlong < $itemlon and $itemlon < $nelong) {
                if ($swlat < $itemlat and $itemlat < $nelat) {
                $dat[] = $row;
                }
            } 
            
        }
   
    /*
    }
$hesql = "SELECT `property_id` FROM `property_user` WHERE `user_id` = $dat[id]";
$resulto = $con->query($hesql);

    if ($resulto->num_rows > 0) {
        while ($rowel = $resulto->fetch_assoc()){ $dato[] = $rowel; }
        foreach ($dato as $value) {
 $sql = "SELECT property_lang.property_id,property_lang.json_object,property_lang.field_36_int,property_lang.field_37_int,property_lang.field_55_int,property_lang.field_82_int, property.image_filename FROM property_lang LEFT JOIN property ON property.id = property_lang.property_id WHERE property_lang.property_id = $value[property_id] AND property_lang.language_id='1' AND property.is_activated='1'";
$result = $con->query($sql);
if ($result->num_rows > 0) { while($row = $result->fetch_assoc()) { $data[] = $row; }  }
}

*/
    echo json_encode($dat);
    } else { echo json_encode("no-result");}
}



    
//If the request is none of the above,
else {
echo "Wrong Request";
}
?>