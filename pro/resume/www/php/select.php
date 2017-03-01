<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-type:text/html;charset=utf-8");
	$db = mysql_connect("bdm267037245.my3w.com","bdm267037245","mynameis009");
	mysql_query("SET NAMES 'UTF8'");
	
	if($db){
		mysql_select_db("bdm267037245_db",$db);
		$sql = "SELECT * FROM  skill";
		$result = mysql_query($sql);
		$arr = array();
		$row = mysql_fetch_row($result);
		
		$results = array();
		while($row = mysql_fetch_assoc($result)){
			$results[] = $row;
		}
		echo json_encode($results);
		mysql_close($db);

	}else{
		echo "连接错误";
	}
?>