<?php


$GameID = $_REQUEST['gameid'];
$GrabGames = $_REQUEST['grabgames'];
$StartRow = $_REQUEST['startrow'];

$gametype = $_REQUEST['gametype'];

if ($gametype == 'grid'){
	getGameGrid($StartRow);
}else if ($gametype == 'single'){
	getsingleGame($GameID);
}else if ($gametype == 'gridgoal'){
	getGoalGameGrid();
}else if ($gametype == 'averages'){
	getAverages();
}else if ($gametype == 'goalaverages'){
	getGoalAverages();
}else{
	echo 'Select a type of game and resubmit!!!!';
}

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
	(SELECT COUNT(GameId) FROM Game) AS TotalCount, 
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
	limit  100
	offset '.$startrow.'';
	$result = mysql_query($query) or die('Get Games Query failed: ' . mysql_error());
	
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
    	$rows[] = $r;
	}

	
	// Free resultset
	mysql_free_result($result);
	// Closing connection
	mysql_close($link);
	//var_dump ($json_output);
	print json_encode($rows);
		
}	


function getGoalGameGrid(){	
		
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
	GameId, 
	ChampId, 
	ChampName, 
	KDA, 
	Kills, 
	Deaths, 
	Assists,
	GameDate 
	FROM Game 
	where ChampId in (201,25, 267, 89, 1, 412)
	ORDER BY GameDate DESC';
	$result = mysql_query($query) or die('Get Games Query failed: ' . mysql_error());
	
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
    	$rows[] = $r;
	}

	
	// Free resultset
	mysql_free_result($result);
	// Closing connection
	mysql_close($link);
	//var_dump ($json_output);
	print json_encode($rows);
		
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
		
		$rows = array();
		while($r = mysql_fetch_assoc($result)) {
    		$rows[] = $r;
		}
		//var_dump ($json_output);
		// Free resultset
		mysql_free_result($result);
		// Closing connection
		mysql_close($link);
	
		print json_encode($rows);
	}else{
		print null;
	}
		
}

function getAverages(){		
		require('gameconnect.php');
	
		// Connecting, selecting database
		$link = mysql_connect($mysql_host, $mysql_user, $mysql_password)
    	or die('Get Games Could not connect: ' . mysql_error());
		//echo 'Connected successfully';
		mysql_select_db($db) or die('Get Games Could not select database');
		// Performing SQL query
		$query = 'SELECT 
		AVG( KDA ) AS AverageKDA, 
		AVG( Kills ) AS AverageKills, 
		AVG( Deaths ) AS AverageDeaths, 
		AVG( Assists ) AS AverageAssists, 
		AVG( WardsPlace ) AS AverageWardsPlaced
		FROM Game';
		$result = mysql_query($query) or die('Get Games Query failed: ' . mysql_error());
		
		$rows = array();
		while($r = mysql_fetch_assoc($result)) {
    		$rows[] = $r;
		}
		// Free resultset
		mysql_free_result($result);
		// Closing connection
		mysql_close($link);
	
		print json_encode($rows);

	 
	
}	

function getGoalAverages(){		
		require('gameconnect.php');
	
		// Connecting, selecting database
		$link = mysql_connect($mysql_host, $mysql_user, $mysql_password)
    	or die('Get Games Could not connect: ' . mysql_error());
		//echo 'Connected successfully';
		mysql_select_db($db) or die('Get Games Could not select database');
		// Performing SQL query
		$query = 'SELECT 
		AVG( KDA ) AS AverageKDA, 
		AVG( Kills ) AS AverageKills, 
		AVG( Deaths ) AS AverageDeaths, 
		AVG( Assists ) AS AverageAssists, 
		AVG( WardsPlace ) AS AverageWardsPlaced
		FROM Game
		where ChampId in (201,25, 267, 89, 1, 412)';
		$result = mysql_query($query) or die('Get Games Query failed: ' . mysql_error());
		
		$rows = array();
		while($r = mysql_fetch_assoc($result)) {
    		$rows[] = $r;
		}
		// Free resultset
		mysql_free_result($result);
		// Closing connection
		mysql_close($link);
	
		print json_encode($rows);

	 
	
}		
 


?>