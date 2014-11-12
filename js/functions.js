
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
        	html += "Champion: " + data[i].ChampName + " ";
        	html += "KDA: " + data[i].KDA + " ";
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
        	html += "<li>Wards Purchased: " + data[i].WardsBought + "</li>";
        	html += "<li>Wards Placed: " + data[i].WardsPlace + "</li>";
        	html += "</ul>";
        	html += "<p>Game Data</p>";
        	html += "<ul>";
        	html += "<li>Game Mode: " + data[i].GameMode + "</li>";
        	html += "<li>Map: " + data[i].Map + "</li>";
        	html += "<li>Game Type: " + data[i].SubType + "</li>";
        	html += "<li>Date Played:" + data[i].GameDate + "</li>";
        	html += "<li>Game Duration: " + data[i].TimePlayed + "</li>";
        	html += "<li>Game Comments: " + data[i].Comments + "</li>";
        	html += "</ul>";
			html += "</div> </div>";
        	if(data[i].Video != ''){
        		video = ' <iframe width="560" height="315" src="//www.youtube.com/embed/'+ data[i].Video +'" frameborder="0" allowfullscreen></iframe>';
        	}else{
        		video = '<p>No video present for this game</p>';
        	}
        	 
       }

    	$("#Champ").html(html);
    	$("#video").html(video);
	}); //end getJson


}//end function


function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}