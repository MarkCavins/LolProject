<?php


$GameID = $_REQUEST['gameid'];
$GrabGames = $_REQUEST['grabgames'];
$StartRow = $_REQUEST['startrow'];



function getGameGrid($startrow){	
		
	require('gameconnect.php');
	if ($startrow == NULL){
		$startrow = 0;
	}else{
		$starrow = $startrow + 100;
	}
	// Connecting, selecting database
	$link = mysql_connect($mysql_host, $mysql_user, $mysql_password)
    or die('Get Games Could not connect: ' . mysql_error());
	//echo 'Connected successfully';
	mysql_select_db($db) or die('Get Games Could not select database');
	// Performing SQL query
	$query = 'SELECT 
	(SELECT COUNT (GameId) FROM Game) AS TotalCount, 
	GameId, 
	ChampId, 
	ChampName, 
	KDA, 
	Kills, 
	Deaths, 
	Assists,
	GameDate 
	FROM Game 
	ORDER BY GameDate DESC
	limt = 100
	offset = '.$startrow.'';
	$result = mysql_query($query) or die('Get Games Query failed: ' . mysql_error());
	
	$json_output = array();
	while($row = mysql_fetch_assoc($result)){
    	$json_output[] = json_encode($row);
	}
	// Free resultset
	mysql_free_result($result);
	// Closing connection
	mysql_close($link);
	
	return $json_output[];
		
}	

function getsingleGame($gameid = null){
	
	if ($gameid != null){	
		
		require('gameconnect.php');
	
		// Connecting, selecting database
		$link = mysql_connect($mysql_host, $mysql_user, $mysql_password)
    	or die('Get Games Could not connect: ' . mysql_error());
		//echo 'Connected successfully';
		mysql_select_db($db) or die('Get Games Could not select database');
		// Performing SQL query
		$query = 'SELECT * FROM Game where GameId ='.$gameid;
		$result = mysql_query($query) or die('Get Games Query failed: ' . mysql_error());
	
		$json_output = array();
		while($row = mysql_fetch_assoc($result)){
    		$json_output[] = json_encode($row);
		}
		// Free resultset
		mysql_free_result($result);
		// Closing connection
		mysql_close($link);
	
		return $json_output[];
	}else{
		return $json_output = null;
	}
		
}		
 


?>