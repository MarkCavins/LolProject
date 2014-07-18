
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
        	vid += "<li> Average KDA: " + data[i].AverageKDA + "</li>";
        	vid += "<li> Average Kills: " + data[i].AverageKills + "</li>";
        	vid += "<li> Average Deaths: " + data[i].AverageDeaths + "</li>";
        	vid += "<li> Average Assists: " + data[i].AverageAssists + "</li>";
        	vid += "<li> Average Wards Placed: " + data[i].AverageWardsPlaced + "</li>";
        	vid += "</ul>";
        	
    	}
    	$("#video").html(vid);
	});
	
	
	
});//document ready close


function goChamp(gameId) {
    
$.getJSON('gd.php?gametype=single&gameid=' + gameId + ' ',
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