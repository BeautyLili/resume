<?php
header("Access-Control-Allow-Origin: *");
require_once "jssdk.php";
$jssdk = new JSSDK("wx63dfdadbb6a0dc07", "ac1b6afce607421dd5c62a0124fcaddf");
$signPackage = $jssdk->GetSignPackage($_POST['url']);
echo json_encode($signPackage);
?>

