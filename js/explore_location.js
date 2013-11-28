
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
    // filterStoryByTags();
    // filterStoryByInTour();
    // filterStoryByImage(); 

    
	$(".thumbup").each(function(){
		var storyNum = $(this).attr("for");
		$(this).html("<span class='glyphicon glyphicon-thumbs-up'></span> "+ storyLikes[storyNum]);
	});

	$(".filter > a").on("click", function(e){
		e.preventDefault();
	});

});
/* ==================

  Helper functions
===================== */
// var filterOptions={"tag":"All Tags", "image": "all", "tour": "all"}; 

// function filterStoryByTags(){
//   $("#tag-filter-dropdown li").on("click", function(){
//     var tag = $.trim($(this).text());
//       console.log(tag);

//     filterOptions.tag = tag;
//     console.log(filterOptions);
// applyFilterOptions();
//   }); //end tag-filter-dropdown click function
// }

// function filterStoryByInTour(){
//   $("#inTour-filter").on("change", function(e){

//   	if($("#inTour-filter").hasClass("active")){
//   		filterOptions.tour= "all";
//   	}
//   	else{
//   		filterOptions.tour="True";
//   	}
//   	    console.log(filterOptions);
//   	    applyFilterOptions();
//   });
// }

// function filterStoryByImage(){
// 	$("#hasPhoto-filter").on("change", function(e){
// 		if($("#hasPhoto-filter").hasClass("active")){
// 			filterOptions.image="all";
// 		}
// 		else{
// 			filterOptions.image="True";
// 		}
// 		    console.log(filterOptions);
// 		    applyFilterOptions();
// 	});
// }

// function applyFilterOptions(){
// 	var tag= filterOptions.tag;
// 	var hasImage = filterOptions.image;
// 	var inTour = filterOptions.tour;
// 	$(".story-block").hide();

// 	if (tag == "All Tags"){
// 		if(hasImage == "True"){
// 			if(inTour == "True"){
// 				$(".story-block[hasImage='True'][inTour='True']").show();
// 			}
// 			else{
// 				$(".story-block[hasImage='True']").show();
// 			}
// 		}
// 		else{
// 			if(inTour == "True"){
// 				$(".story-block[inTour='True']").show();
// 			}
// 			else{
// 				$(".story-block").show();
// 			}
// 		}
// 	}
// 	else{
// 		if(hasImage == "True"){
// 			if(inTour == "True"){
// 				var blocks = $(".story-block[hasImage='True'][inTour='True']");
// 				blocks.each(function(){
// 					if ($(this).find(".tags").text().indexOf(tag) !=-1){
// 						$(this).show();
// 					}
// 				});
// 			}
// 			else{
// 				var blocks = $(".story-block[hasImage='True']");
// 				blocks.each(function(){
// 					if ($(this).find(".tags").text().indexOf(tag) !=-1){
// 						$(this).show();
// 					}
// 				});
// 			}
// 		}
// 		else{
// 			if(inTour == "True"){
// 				var blocks = $(".story-block[inTour='True']");
// 				blocks.each(function(){
// 					if ($(this).find(".tags").text().indexOf(tag) !=-1){
// 						$(this).show();
// 					}
// 				});
// 			}
// 			else{
// 				$(".story-block").each(function(){
// 					if ($(this).find(".tags").text().indexOf(tag) !=-1){
// 						$(this).show();
// 					}
// 				});
// 			}
// 		}
// 	}
// }