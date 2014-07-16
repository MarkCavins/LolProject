


$(document).ready(function(){
	$.getJSON('gd.php?gametype=grid' , function(data) {
    	var tbl_body = "";
    	$.each(data, function() {
        	var tbl_row = "";
        	$.each(this, function(k , v) {
            	tbl_row += "<td>"+v+"</td>";
        	})
        	tbl_body += "<tr>"+tbl_row+"</tr>";                 
    	})
    	$("#mytable tbody").html(tbl_body);
	});

});