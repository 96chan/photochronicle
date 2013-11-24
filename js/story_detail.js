
/* =====================

	Document Ready

====================== */
$(document).ready(function() {
	// init();
    // google.maps.event.addDomListener(window, "load", initialize);
    // $('.dropdown-toggle').dropdown();
    // $('.btn-group').button();
    
    // $('.thumbnail').on("click", function(){
    // });
	$(".story-detail-div").hide();
	$(".testarea").hide();
	$(".testarea2").hide();
	
	$(".jTscroller > a").on("click", function(e){
		e.preventDefault();
		var path = $(this).children("img").attr("src");
		// console.log(path);

		$(".story-large-img-div > .thumbnail").html("<img src='"+path+"'/>");
		// console.log($(".story-large-img-div > .thumbnail").html());
	});

	
});