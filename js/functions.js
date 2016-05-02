
$(document).ready(function(){

$.getJSON('gd.php?gametype=grid',
	function (data) {
    	var html = '';
    	
    	for (var i = 0; i < data.length; i++) {
        	html += "<tr>";
        	html += "<td><a href='#' onclick='goChamp(" + data[i].GameId + ")' >" + data[i].ChampName + "</a></td>";
        	html += "<td>" + data[i].KDA + "</td>";
        	html += "<td>" + data[i].Kills + "</td>";
        	html += "<td>" + data[i].Deaths + "</td>";
        	html += "<td>" + data[i].Assists + "</td>";
        	html += "<td>" + data[i].GameDate + "</td>";
        	html += "</tr>";
        	
    	}
    	$("#mytable tbody").html(html);
	});
	
	
	$.getJSON('gd.php?gametype=averages',
	function (data) {
    	var vid = '';
    	
    	for (var i = 0; i < data.length; i++) {
    		vid += "<h2>Current Averages</h2>";
        	vid += "<ul>";
        	vid += "<li> Average KDA: " + roundToTwo(data[i].AverageKDA) + "</li>";
        	vid += "<li> Average Kills: " + roundToTwo(data[i].AverageKills) + "</li>";
        	vid += "<li> Average Deaths: " + roundToTwo(data[i].AverageDeaths) + "</li>";
        	vid += "<li> Average Assists: " + roundToTwo(data[i].AverageAssists) + "</li>";
        	vid += "<li> Average Wards Placed: " + roundToTwo(data[i].AverageWardsPlaced) + "</li>";
        	vid += "</ul>";
        	
    	}
    	$("#video").html(vid);
	});
	
	
	
});//document ready close

function goalClick(season, goal, champ){
	
	
	
	$.getJSON('gd.php?gametype=grid&season='+ season +'&goal='+ goal +'&champ='+ champ +'',
	function (data) {
    	var html = '';
    	
    	
    	for (var i = 0; i < data.length; i++) {
        	html += "<tr>";
        	html += "<td><a href='#' onclick='goChamp(" + data[i].GameId + ", season=\""+season+"\")' >" + data[i].ChampName + "</a></td>";
        	html += "<td>" + data[i].KDA + "</td>";
        	html += "<td>" + data[i].Kills + "</td>";
        	html += "<td>" + data[i].Deaths + "</td>";
        	html += "<td>" + data[i].Assists + "</td>";
        	html += "<td>" + data[i].GameDate + "</td>";
        	html += "</tr>";
        	
    	}
    	$("#mytable tbody").html(html);
    	
    	if (season == 'season4'){
    		title = '<p>Welcome to the stats dashboard for Season 4. Since having a kid at the begining of Season 4 I have not'; 
    		title += 'had much time to play ranked so most games here will be normal and ARAM games. After I got to the point of being able to play a ';
    		title += 'few game a night in June I thought lets focus for the rest of Season 4 on basic game stats to get better at the game and make myself'; 
    		title += 'a stronger player for Season 5. </p>';	
          	title += '<h5>Goals for Season 4</h5>';
          	title += '<ul>';
          	title += '<li>Try to maintain a 3.00 KDA in solo queue for normals and ARAM.</li>';
          	title += '<li>Try to play at least 20 games with each support</li>';
          	title += '<ul>';
          	title += '<li>Morgana</li>';
          	title += '<li>Leona</li>';
          	title += '<li>Braum</li>';
          	title += '<li>Thresh</li>';
          	title += '<li>Sona</li>';
          	title += '<li>Nami</li>';
          	title += '</ul>';
          	title += '<li>Placing at least 30 wards per game as a support</li>';
          	title += '<li>Get better at positioning!!!!!!</li>';
          	title += '<li>Have Fun!</li>';
          	title += '</ul>';
    		
    		
    		$("#Champ").html(title);
    		
    		header = 'Season 4';
    		$("#Header").html(header);
    	}
    	
    	if (season == 'preseason5'){
    		title = '<p> Welcome to Pre-Season! Going into the last month I almost considered abandoning my 4th Season goal and going back into ranked. Then I went on a 2 week '; 
    		title += 'streak where I averaged 1 win to every 6 losses. If this had been in ranked I would have said this is because of the scramble for everyone to get out of ';
    		title += 'their current Division. But this was Normals so I did not get it. Suffice to say I stayed in normals and lost my lovely silver border. So Sad. </p>'; 
    		title += '<p> But now is the time where Riot introduces most of the changes for the next season and JOY an update to the map. As of yet I do not have a goal except to';	
          	title += '	further work on support mechanics. I will be focusing more on non-traditional supports and champs that I can use to carry a game in case the lane partner ';
          	title += 'is not up to the task.</p>';
          	title += '<ul>';
          	title += '<h3>Starting Goal</h3>';
          	title += '<li>4.00 KDA - 3.00 was too easy to obtain so going for 4.</li>';
          	title += '<li>Have more kills than deaths - Last season I let my assists carry my KDA. That only works when your team is getting kills</li>';
          	title += '<li>Place 30 wards per game as a support. 15 as any other lane - I saw that when I did not play as a support the guy who did thought ';
          	title += 'other items were more important than wards. So if they can not be up to the task I need to buy more wards. I probably need to buy';
          	title += ' more wards anyways. vision is key.</li>';
          	title += '</ul>';
    		
    		
    		$("#Champ").html(title);
    		
    		header = 'Pre-Season 5';
    		$("#Header").html(header);
    	}
    	
    	if (season == 'season5'){
    		title = '<p> Season 5 or as I like to call it the season of grinding with Sona and Lulu.'; 
    		title += 'In Season 5 I was able to capture a full season of stats and find out a little about more about my play style. </p>';
    		title += '<h3>Things learned:</h3>'; 
          	title += '<ul>';
          	title += '<li>Even focusing mostly on supports I could keep a mid 4 KDA</li>';
          	title += '<li>Akali is either and instant win or she cannot carry the team to victory. There were several games where I would have 20 plus kills but still not keep my team in the game.</li>';
          	title += '<li>I could keep an over .500 winrate with champs like Ziggs, Veigar, Lulu and Sona</li>';
          	title += '<li>Having 2 champs in two lanes that I could help carry games gave me the chance to focus on those two lanes </li>';
          	title += '<li>With Jungling and Top I could not have the same winrate so I know for next season that that should be a focus.</li>';
          	title += '<li>Average warding for supports did not increase or decrease. One thing I might track in future seasons is the coorilation to ward count to win ratio.</li>';
          	title += '</ul>';
    		
    		
    		$("#Champ").html(title);
    		
    		header = 'Season 5';
    		$("#Header").html(header);
    	}
    	
    	if (season == 'preseason6'){
    
    		title =  '<p> Pre-season 6</p>'; 
    		title += '<p> For pre-season I will be focusing on Top and Jungle roles. This went badly for me last season with only a 45% win rate';
    		title += 'when I went those roles. While I will never be a good Jungler I will focus on 2 champs that I can help lanes early.</p>'; 
          	title += '<p>With Top lane I am going to focus on Jugernauts that can bully lane and champs that can use Rageblade until that';
          	title += 'items eventural nerf.</p>';
         	title += '<p>Provided that I can up my win rate I will start playing ranked in season 6. </p>';
    		
    		
    		$("#Champ").html(title);
    		
    		header = 'Pre-Season 6';
    		$("#Header").html(header);
    	}
    	
    	
	});
	
	
	$.getJSON('gd.php?gametype=averages&season='+ season +'&goal='+ goal +'&champ='+ champ +'',
	function (data) {
    	var vid = '';
    	
    	if (season == 'season4'){
    		
    		if (goal == 'season4goal'){
    			toptitle = 'S4 Goal Champs Averages';
    		}else{
    			toptitle = 'S4 Champs Averages';
    		}
    		
    	}else{
    		toptitle = 'Current Averages';
    	}
    	
    	for (var i = 0; i < data.length; i++) {
    		vid += "<h2>" + toptitle + " </h2>";
        	vid += "<ul>";
        	vid += "<li> Average KDA: " + roundToTwo(data[i].AverageKDA) + "</li>";
        	vid += "<li> Average Kills: " + roundToTwo(data[i].AverageKills) + "</li>";
        	vid += "<li> Average Deaths: " + roundToTwo(data[i].AverageDeaths) + "</li>";
        	vid += "<li> Average Assists: " + roundToTwo(data[i].AverageAssists) + "</li>";
        	vid += "<li> Average Wards Placed: " + roundToTwo(data[i].AverageWardsPlaced) + "</li>";
        	vid += "</ul>";
        	
    	}
    	$("#video").html(vid);
	});
	
	
}//end goal click

function goChamp(gameId, season) {
    
$.getJSON('gd.php?gametype=single&gameid=' + gameId + '&season=' + season + ' ',
	function (data) {
    	var html = '';
    	var video = '';
    	for (var i = 0; i < data.length; i++) {
    		if (data[i].Win == 'Yes'){
    			html += "<div class='jumbotron' id='win'> <div class='container'>";
    		}else{
    			html += " <div class='jumbotron' id='loss'> <div class='container'>";
    		}
        	html += "<p>";
        	html += "Champion: " + data[i].ChampName + "</p> ";
        	html += "<p> KDA: " + data[i].KDA + " ";
        	html += "Kills: " + data[i].Kills + " ";
        	html += "Deaths: " + data[i].Deaths + " ";
        	html += "Assists: " + data[i].Assists + " ";
        	html += "</p>";
        	html += "<p>Performance Data</p>";
        	html += "<ul>";
        	html += "<li>Double Kills: " + data[i].DoubleKills + "</li>";
        	html += "<li>Triple Kills: " + data[i].TripleKills + "</li>";
        	html += "<li>Quadra Kills: " + data[i].QuadraKills + "</li>";
        	html += "<li>Penta Kills: " + data[i].PentaKills + "</li>";
        	html += "<li>Gold Earned: " + data[i].GoldEarned + "</li>";
        	html += "<li>Gold Spent: " + data[i].GoldSpent + "</li>";
        	html += "<li>Wards Placed: " + data[i].WardsPlace + "</li>";
        	html += "</ul>";
        	html += "<p>Game Data</p>";
        	html += "<ul>";
        	html += "<li>Game Mode: " + data[i].GameMode + "</li>";
        	html += "<li>Game Type: " + data[i].SubType + "</li>";
        	html += "<li>Date Played: " + data[i].GameDate + "</li>";
        	html += "<li>Game Duration: " + data[i].TimePlayed + "</li>";
        	html += "</ul>";
			html += "</div> </div>";
        	 if(data[i].ChampName != ''){
        	  	
				$.getJSON('gd.php?gametype=champ&champ=' + data[i].ChampName + '&season=' + season + ' ',
				
					function (data) {
						
						for (var i = 0; i < data.length; i++) {
							video += "<h4>Champ Summary for: "+ data[i].ChampName +"</h4>";
							video += "<ul>";
							video += "<li>Games Played: "+ data[i].GamesPlayed +"</li>";
							video += "<li>Wins: "+ data[i].WinCount +" / Losses: "+ data[i].LossCount +" </li>";
							video += "<li>Season KDA: "+ data[i].AverageKDA +"</li>";
							video += "<li>Average Game Legnth: "+ data[i].AverageTimePlayed +"</li>";
							video += "<li>Time Played this Season: "+ data[i].TotalTimePlayed +"</li>";
							video += "<li>Average Wards Placed: "+ data[i].AvgWardsPlaced +"</li>";
							video += "</ul>";
						}
						$("#video").html(video);
					});
        	}else{
        		video = '<p>No data present!</p>';
        		$("#video").html(video);
        	}
        	 
        
      }
      
   

    	$("#Champ").html(html);
    	
	}); //end getJson




}//end function


function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}