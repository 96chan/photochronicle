
var maxStory = 3;
var storyLikes={"story1Likes":250, "story2Likes": 500, "story3Likes": 56}; 

var maps=[];
var mapOptions; 
function initialize() {
   mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  // map = new google.maps.Map(document.getElementsByClassName('tour-map-canvas'),
  //     mapOptions);
 	$(document.getElementsByClassName('tour-map-canvas')).each(function(){
  		console.log($(this));
        var map = new google.maps.Map($(this)[0], mapOptions);
    });

 }
/* =====================

	Document Ready

====================== */
$(document).ready(function() {
	// init();
     google.maps.event.addDomListener(window, "load", initialize);
    $('#tour-grid').mixitup();
    $("#story-grid").mixitup();

    $('.dropdown-toggle').dropdown();
    $('.btn-group').button();

    $("#sort-likes").on("click", function(){
    	$('#story-grid').mixitup('sort',["data-name",'asc']);
    });

    
	$(".thumbup").each(function(){
		var storyNum = $(this).attr("for");
		$(this).html("<span class='glyphicon glyphicon-heart'></span> "+ storyLikes[storyNum]);
	});

	$(".filter > a").on("click", function(e){
		e.preventDefault();
	});

  $('#btn-addStory').click(function(){
    $('#addStory-modal').modal('toggle');
});

});
