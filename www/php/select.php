<?php
	header("Content-type:text/html;charset=utf-8");
	$db = mysql_connect("bdm267037245.my3w.com","bdm267037245","mynameis009");
	if($db){
		mysql_select_db("bdm267037245_db",$db);
		$sql = "SELECT * FROM skill";
		$result = mysql_query($sql);
		echo $result;
		$arr = array();
		while($row = mysql_fetch_assoc($result)){

			array_push($arr,$row);
		}
		echo json_decode($arr);

	}else{
		echo "error";
	}

?>