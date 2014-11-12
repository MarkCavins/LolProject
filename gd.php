<?php


$GameID = $_REQUEST['gameid'];
$GrabGames = $_REQUEST['grabgames'];
$gametype = $_REQUEST['gametype'];

//new vars for preseason and eventual season 5 and on
$goal = $_REQUEST['goal'];
$champ = $_REQUEST['champ'];
$season = $_REQUEST['season'];

if ($gametype == 'grid'){
	getGameGrid($season, $goal, $champ);
}else if ($gametype == 'single'){
	getsingleGame($GameID, $season);
}else if ($gametype == 'averages'){
	getAverages($season, $goal, $champ);
}else{
	echo 'Select a type of game and resubmit!!!!';
}

function getGameGrid($season=NULL,  $goal=NULL, $champ=NULL){	
		
	require('gameconnect.php');
	if ($season == NULL){
		$setDb = 'FROM preseason5';
	}else if ($season == 'preseason5'){
		$setDb = 'FROM preseason5';
	}else if ($season == 'season4'){
		$setDb = 'FROM Game';
	}
	
	if ($goal == NULL){
		$setGoal = '';
	}else if ($goal == 'season4goal'){
		$setGoal = 'where ChampId in (201,25, 267, 89, 37, 412)';
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
	'. $setDb .'
	'. $setGoal .'
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


function getsingleGame($gameid = null, $season = null){
	
	if ($gameid != null){	
		
		require('gameconnect.php');
	
		if ($season == NULL || $season == 'undefined'){
			$setDb = 'FROM preseason5';
		}else if ($season == 'preseason5'){
			$setDb = 'FROM preseason5';
		}else if ($season == 'season4'){
			$setDb = 'FROM Game';
		}


		// Connecting, selecting database
		$link = mysql_connect($mysql_host, $mysql_user, $mysql_password)
    	or die('Get Games Could not connect: ' . mysql_error());
		//echo 'Connected successfully';
		mysql_select_db($db) or die('Get Games Could not select database');
		// Performing SQL query
		$query = 'SELECT * '.$setDb.' where GameId ='.$gameid;
		

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

function getAverages($season=NULL,  $goal=NULL, $champ=NULL){		
		require('gameconnect.php');

		if ($season == NULL){
			$setDb = 'FROM preseason5';
		}else if ($season == 'preseason5'){
			$setDb = 'FROM preseason5';
		}else if ($season == 'season4'){
			$setDb = 'FROM Game';
		}

		if ($goal == NULL){
			$setGoal = '';
		}else if ($goal == 'season4goal'){
			$setGoal = 'where ChampId in (201,25, 267, 89, 37, 412)';
		}
	
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
		'. $setDb .'
		'. $setGoal .'
		';
		
		
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

	 
	
}//end function	
	 


?>