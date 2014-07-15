<?php
	
	require('gameconnect.php');
	
	//Main game URL
	$game_url = 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/27302940/recent?'.$gamekey;

	$userAgent = "Muffin Puffer Lol Processor";
	$ch=curl_init();
	curl_setopt($ch, CURLOPT_URL, $game_url);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
   	//Don't show XML
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $foo = curl_exec($ch);
    	
	$set_result = json_decode($foo);
	curl_close($ch);
        
	foreach($set_result->games as $p){
		//connect to the game db to see if the game id already exist
		
		if(getGames($p->gameId) == FALSE){ 
			echo 'Processing Game ID: '. $p->gameId .'<br />';
			//If it doesn't add values
			
			if ($p->stats->numDeaths != 0 || $p->stats->numDeaths != '' || $p->stats->numDeaths != NULL){
				$kda = sprintf('%.02f', ($p->stats->championsKilled + $p->stats->assists) / $p->stats->numDeaths);
			}else{
				$kda = sprintf('%.02f', ($p->stats->championsKilled + $p->stats->assists) / 1);
			}
			date_default_timezone_set('America/Los_Angeles');
			$time_played = gmdate('H:i:s', $p->stats->timePlayed);	
			$game_date = date('Y-m-d H:i:s',$p->createDate/1000);
		
			if($p->stats->win == true){
				$did_win= 'Yes';	
			}else{
				$did_win= 'No';
			}
		
			if ($p->mapId == 1){
				$map = "The Rift Baby!!";
			}else{
				$map = "Some other Map";
			}
		
			if($p->championId != null && $p->championId != ''){
				$champ_url = sprintf('https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/%d?%s',
				$p->championId, $gamekey);
			
				$userAgent = "Muffin Puffer Lol Processor";
        		$ch1 = curl_init();
        		curl_setopt($ch1, CURLOPT_URL, $champ_url);
        		curl_setopt($ch1, CURLOPT_HEADER, 0);
        		curl_setopt($ch1, CURLOPT_USERAGENT, $userAgent);
        		//Don't show XML
       		 	curl_setopt($ch1, CURLOPT_RETURNTRANSFER, 1);
        		$champ = curl_exec($ch1);
    	
				$champ_result = json_decode($champ);
				curl_close($ch1);
			
				$champ_name = $champ_result->name;
				$champ_title = $champ_result->title;
			}
			
			
			mysql_insert(array(
    		'GameId' => $p->gameId,
    		'ChampId' => $p->championId,
    		'ChampName' => htmlspecialchars($champ_name, ENT_QUOTES),
    		'ChampTitle' => $champ_title,
    		'Win' => $did_win,
    		'KDA' => $kda,
    		'Kills' => $p->stats->championsKilled,
    		'Deaths' => $p->stats->numDeaths,
    		'Assists' => $p->stats->assists,
    		'DoubleKills' => $p->stats->doubleKills,
    		'TripleKills' => $p->stats->tripleKills,
    		'QuadraKills' => $p->stats->quadraKills,
    		'PentaKills' => $p->stats->pentaKills,
    		'GoldEarned' => $p->stats->goldEarned,
    		'GoldSpent' => $p->stats->goldSpent,
    		'WardsPlace' => $p->stats->wardPlaced,
    		'WardsBought' => $p->stats->sightWardsBought,
    		'TimePlayed' => $time_played,
    		'GameMode' => $p->gameMode,
    		'Map' => $map,
    		'SubType' => $p->subType,
    		'GameDate' => $game_date,
    		'Video' => '',
			'Comments' => '')
			);
			
			/*$p->gameId; $p->championId; $champ_name; $champ_title; $did_win; $kda;
			$p->stats->championsKilled; $p->stats->numDeaths;  $p->stats->assists; $p->stats->doubleKills;
			$p->stats->tripleKills; $p->stats->quadraKills; $p->stats->pentaKills; $p->stats->goldEarned;
			$p->stats->goldSpent; $p->stats->wardPlaced; $p->stats->sightWardsBought; $time_played;
			$p->gameMode; $map; $p->subType; $game_date;
			 */
		}else{
			echo 'No Need to process '.$p->gameId.' info already exists. <br />';
		}
	}
echo 'Done Processing';
		
		
function getGames($gameid){	
		
	require('gameconnect.php');
	
	
	// Connecting, selecting database
	$link = mysql_connect($mysql_host, $mysql_user, $mysql_password)
    or die('Get Games Could not connect: ' . mysql_error());
	//echo 'Connected successfully';
	mysql_select_db($db) or die('Get Games Could not select database');
	// Performing SQL query
	$query = 'SELECT GameId FROM Game where GameId ='.$gameid;
	$result = mysql_query($query) or die('Get Games Query failed: ' . mysql_error());
	$set_result = mysql_result($result, 0); 

	if ($set_result != null){
		$game_exists = TRUE;
	} else{
		$game_exists = FALSE;
	}

	// Free resultset
	mysql_free_result($result);
	// Closing connection
	mysql_close($link);
	
	return $game_exists;
		
}		
 

function mysql_insert($inserts) {
	require('gameconnect.php');
	
    $values = array_values($inserts);
    $keys = array_keys($inserts);
	// Connecting, selecting database
    $link = mysql_connect($mysql_host, $mysql_user, $mysql_password)
    or die('Set Games Could not connect: ' . mysql_error());
	//echo 'Connected successfully';
	mysql_select_db($db) or die('Set Games Could not select database');
	
	
    $result = mysql_query('INSERT INTO Game (`'.implode('`,`', $keys).'`) VALUES (\''.implode('\',\'', $values).'\')')
	or die('Set Games Query failed: ' . mysql_error());
	
	// Free resultset
	mysql_free_result($result);
	// Closing connection
	mysql_close($link);
}

?>