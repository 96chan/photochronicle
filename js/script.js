/*

*** Google Map API
https://developers.google.com/maps/documentation/javascript/tutorial#Audience


*/

var map;
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

/* =====================

	Document Ready

====================== */
$(document).ready(function() {
	// init();
    google.maps.event.addDomListener(window, "load", initialize);
    $('.dropdown-toggle').dropdown();
    $('.btn-group').button();

    $('.thumbnail').on("click", function(){
        console.log("boo");
    });

    filterStoryByTags();
});

/* ==================

  Helper functions
===================== */
function filterStoryByTags(){
  $("#tag-filter-dropdown li").on("click", function(){
    var tag = $.trim($(this).text());
      console.log(tag);

    $(".story-block").each(function(index){
      if(tag == "All Tags"){
        $(this).show();
      }
      else{
        var tags = $(this).find(".tags").text();
        console.log(tags);
        console.log(tags.indexOf(tag));
        if(tags.indexOf(tag) == -1){
          $(this).hide();
        }
        else{
          $(this).show();
        }
      }
    }); //story-block each function

  }); //end tag-filter-dropdown click function
}

function filterStoryByInTour(){
  
}









