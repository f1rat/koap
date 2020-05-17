<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');
header('Access-Control-Allow-Origin: *');  
$con = new mysqli("localhost","kiraliko_4r376fg",";xlUeQuUB1Hc","kiraliko_d1b9s3i5k");
$productId = htmlspecialchars($_POST["productId"]);
$imageToDel = htmlspecialchars($_POST["imageToDel"]);

$con->query("DELETE FROM file WHERE `filename`='".$imageToDel."'");


$sql = "SELECT `image_repository` FROM property WHERE `id`='".$GLOBALS['productId']."'";
$result = $con->query($sql);
$followingdata = $result->fetch_array(MYSQLI_ASSOC);
$repoi = $followingdata["image_repository"]; 
$data = $repoi;

// decode json to associative array
$json_arr = json_decode($data, true);

// get array index to delete
$arr_index = array();
foreach ($json_arr as $key => $value) {
    if ($value == $imageToDel) {
        $arr_index[] = $key;
    }
}

// delete data
foreach ($arr_index as $i) {
    unset($json_arr[$i]);
}

// rebase array
$json_arr = array_values($json_arr);
$sqle = "SELECT * FROM `property` WHERE `id`='".$productId."'";
$resulte = $con->query($sqle);
$resulted = $resulte->fetch_array(MYSQLI_ASSOC);
$resultend = $resulted["image_filename"]; 
if ($resultend == $imageToDel) {
    $sql4 = "UPDATE `property` SET `image_filename`='".$json_arr[0]."' WHERE `id`='".$productId."'";
    $result4 = $con->query($sql4);
}


if (count($json_arr) > 0) { 
$sql2="UPDATE `property` SET `image_repository`='".json_encode($json_arr)."' WHERE `id`='".$productId."'";
$result2 = $con->query($sql2);
} else {
$sql2="UPDATE `property` SET `image_repository`='', `image_filename`=''  WHERE `id`='".$productId."'";
$result2 = $con->query($sql2);
}

//echo json_encode($json_arr);
$con->close();
?>