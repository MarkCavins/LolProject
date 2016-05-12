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
			
			//Get the Champ stats
			
			$myTeam = $p->stats->team;
			$myChamp = $p->championId;
			
			
	for($i = 0; $i <= 8; $i ++){
		
    		  $player[$i] = $p->fellowPlayers[$i]->championId;
    		  $playerteam[$i] = $p->fellowPlayers[$i]->teamId;
			
	}	
			
		
	
		
			if($p->stats->win == true){
				$win = 'T';	
			}else{
				$win = 'F';
			}
		
			if ($p->mapId == 11){
				
				if ($p->subType =='RANKED_SOLO_5x5' || $p->subType =='NORMAL'){
				
					
				  mysql_insert(array(
    				'GameId' => $p->gameId,
    				'GameMode' => $p->subType,
    				'Win' => $win,
    				'Team' => $myTeam,
    				'Map' => $p->mapId,
    				'MySummonerID' => $myChamp,
    				'Summoner1ID' => $player[0],
    				'Summoner1Team' => $playerteam[0],
    				'Summoner2ID' => $player[1],
    				'Summoner2Team' => $playerteam[1],
    				'Summoner3ID' => $player[2],
    				'Summoner3Team' => $playerteam[2],
    				'Summoner4ID' => $player[3],
    				'Summoner4Team' => $playerteam[3],
    				'Summoner5ID' => $player[4],
    				'Summoner5Team' => $playerteam[4],
    				'Summoner6ID' => $player[5],
    				'Summoner6Team' => $playerteam[5],
    				'Summoner7ID' => $player[6],
    				'Summoner7Team' => $playerteam[6],
    				'Summoner8ID' => $player[7],
    				'Summoner8Team' => $playerteam[7],
    				'Summoner9ID' => $player[8],
    				'Summoner9Team' => $playerteam[8])
				   );
				
				}else{
					echo 'Game '.$p->gameId.' is not a normal or ranked game. Not processing.<br />';
				}
		 	
		   }
		 
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
	$query = 'SELECT GameId FROM LolstatsProcessing where GameId ='.$gameid;
	$result = mysql_query($query) or die('Get Games Query failed: ' . mysql_error());
	$set_result = mysql_num_rows($result);

	if ($set_result > 0){
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
	
	
    $result = mysql_query('INSERT INTO LolstatsProcessing (`'.implode('`,`', $keys).'`) VALUES (\''.implode('\',\'', $values).'\')')
	or die('Set Games Query failed: ' . mysql_error());
	
	// Closing connection
	mysql_close($link);
}

?>