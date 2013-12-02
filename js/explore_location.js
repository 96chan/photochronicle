
var maxStory = 3;
var storyLikes={"story1Likes":250, "story2Likes": 500, "story3Likes": 56}; 
/* =====================

	Document Ready

====================== */
$(document).ready(function() {
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
