<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');
header('Access-Control-Allow-Origin: *');  
$con = new mysqli("localhost","kiraliko_4r376fg",";xlUeQuUB1Hc","kiraliko_d1b9s3i5k");
$GLOBALS['token'] = htmlspecialchars($_POST["token"]);
$GLOBALS['listingid'] = htmlspecialchars($_POST["productId"]);
$target_dir = "files/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

function findexts ($filename)
{
$filename = strtolower($filename) ;
$exts = preg_split("[/\\.]", $filename) ;
$n = count($exts)-1;
$exts = $exts[$n];
return $exts;
}
    
//This applies the function to our file
$ext = findexts ($_FILES['fileToUpload']['name']) ; 


//This line assigns a random number to a variable. You could also use a timestamp here if you prefer.
$ran = rand () ;
$GLOBALS['rani'] = $ran.$ext;
 //This takes the random number (or timestamp) you generated and adds a . on the end, so it is ready for the file extension to be appended.
$ran2 = $ran;

 //This assigns the subdirectory you want to save into... make sure it exists!
$target = "files/";
$target2 = "files/thumbnail/";

//This combines the directory, the random file name and the extension 
$target = $target . $ran2.$ext;
$target2 = $target2 . $ran2.$ext;

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        //echo "File is an image - " . $check["mime"] . ".";
        $GLOBALS['mim'] = $check["mime"];
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
        die();
    }
}

// Check file size
if ($_FILES["fileToUpload"]["size"] > 6000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
    die();
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
    die();
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
    die();
// if everything is ok, try to upload file
} else {
    
    
 if(!empty($_FILES['fileToUpload']['name'])){
    
    //call thumbnail creation function and store thumbnail name
    $upload_img = cwUpload('fileToUpload','files/','',TRUE,'files/thumbnail/','300','225');
    
    //full path of the thumbnail image
    $thumb_src = 'files/thumbnails/'.$upload_img;
         
}else{
    
    //if form is not submitted, below variable should be blank
    $thumb_src = '';
    $message = '';
 }   
}


function getRepo (){
$con = new mysqli("localhost","kiraliko_4r376fg",";xlUeQuUB1Hc","kiraliko_d1b9s3i5k");
$sql = "SELECT `repository_id` FROM property WHERE `id`='".$GLOBALS['listingid']."'";
$result = $con->query($sql);
$followingdata = $result->fetch_array(MYSQLI_ASSOC);
$repoi = $followingdata["repository_id"];

$sql3 = "SELECT MAX(`order`) FROM file";
$result3 = $con->query($sql3);
$followingdata3 = $result3->fetch_array(MYSQLI_ASSOC);
$order = $followingdata3["MAX(`order`)"];
$order = $order + 1;
    
$sql2 = "INSERT INTO file (`order`, `repository_id`, `filetype`, `filename`) VALUES ('".$order."','".$repoi."', '".$GLOBALS['mim']."','".$GLOBALS['rani']."')";
if ($con->query($sql2) === TRUE) {
    //echo "New record created successfully";
    echo $GLOBALS['rani'];
} else {
    echo "Error in sql2: " . $sql2 . "<br>" . $con->error;
}
$repoarr = array();
array_push($repoarr, $GLOBALS['rani']);
    
    
$sql5 = "SELECT `image_repository` FROM property WHERE `id`='".$GLOBALS['listingid']."'";
$result5 = $con->query($sql5);
$followingdata5 = $result5->fetch_array(MYSQLI_ASSOC);
$repoi5 = $followingdata5["image_repository"]; 
    if ($repoi5 == null) {
$sql4 = "UPDATE property SET `image_filename` = '".$GLOBALS['rani']."', `image_repository` = '".json_encode($repoarr)."' WHERE `id`='".$GLOBALS['listingid']."'";
if ($con->query($sql4) === TRUE) {
    //echo " record updated successfully";
} else {
    echo "Error: " . $sql4 . "<br>" . $con->error;
}        
    } else {
        $fiftharray = array();
        $repoi5 = substr($repoi5, 0, -2);
        $repoi5 = substr($repoi5, 2);
        array_push($fiftharray, $repoi5);
        array_push($fiftharray, $GLOBALS['rani']);

        $sql6 = "UPDATE property SET `image_repository` = '".json_encode($fiftharray)."' WHERE `id`='".$GLOBALS['listingid']."'";
            if ($con->query($sql6) === TRUE) {
            //echo " record updated successfully";
            } else {
            echo "Error: " . $sql6 . "<br>" . $con->error;
            }        
        }
    $con->close();
}



getRepo();


function cwUpload($field_name = '', $target_folder = '', $file_name = '', $thumb = FALSE, $thumb_folder = '', $thumb_width = '', $thumb_height = ''){

    //folder path setup
    $target_path = $target_folder;
    $thumb_path = $thumb_folder;
    
    //file name setup
    $filename_err = explode(".",$_FILES[$field_name]['name']);
    $filename_err_count = count($filename_err);
    $file_ext = $filename_err[$filename_err_count-1];
    if($file_name != ''){
        $fileName = $file_name.'.'.$file_ext;
    }else{
        //$fileName = $_FILES[$field_name]['name'];
        $fileName = $GLOBALS['rani'];
    }
    
    //upload image path
    $upload_image = $target_path.basename($fileName);
    
    //upload image
    if(move_uploaded_file($_FILES[$field_name]['tmp_name'],$upload_image))
    {
        //thumbnail creation
        if($thumb == TRUE)
        {
            $thumbnail = $thumb_path.$fileName;
            list($width,$height) = getimagesize($upload_image);
            $thumb_create = imagecreatetruecolor($thumb_width,$thumb_height);
            switch($file_ext){
                case 'jpg':
                    $source = imagecreatefromjpeg($upload_image);
                    break;
                case 'jpeg':
                    $source = imagecreatefromjpeg($upload_image);
                    break;

                case 'png':
                    $source = imagecreatefrompng($upload_image);
                    break;
                case 'gif':
                    $source = imagecreatefromgif($upload_image);
                    break;
                default:
                    $source = imagecreatefromjpeg($upload_image);
            }

            imagecopyresized($thumb_create,$source,0,0,0,0,$thumb_width,$thumb_height,$width,$height);
            switch($file_ext){
                case 'jpg' || 'jpeg':
                    imagejpeg($thumb_create,$thumbnail,100);
                    break;
                case 'png':
                    imagepng($thumb_create,$thumbnail,100);
                    break;

                case 'gif':
                    imagegif($thumb_create,$thumbnail,100);
                    break;
                default:
                    imagejpeg($thumb_create,$thumbnail,100);
            }

        }

        return $fileName;
    }
    else
    {
        return false;
    }
}
?>