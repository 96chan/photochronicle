var storyLikes={"story1Likes":200, "story2Likes": 100, "story3Likes3": 56}; 
/* =====================

	Document Ready

====================== */
$(document).ready(function() {
	
	$("#story-desc-form").hide();
 	$(".edit-rights").hide();
 	$("#draft").hide();

	$(".timeline > .event").on("click", function(){
		var path = $(this).children("img").attr("src");
		console.log(path);
		 console.log($(".large-img").children("img").attr("src"));
		$(".large-img").children("img").attr("src", path);
	});

	$(".like-btn").on("click", function(){
		var likeCount = $(this).next(".like-count");
		var storyNum = $(this).attr("for");
		
		storyLikes[storyNum] = storyLikes[storyNum]+ 1;
		likeCount.html(storyLikes[storyNum]);

	});

	$("#check-private").on("click", function(){
		if($(this).children("span").hasClass("glyphicon-unchecked")){
			$(this).children("span").removeClass("glyphicon-unchecked");
			$(this).children("span").addClass("glyphicon-check");
		}
		else if($(this).children("span").hasClass("glyphicon-check")){
			$(this).children("span").removeClass("glyphicon-check");
			$(this).children("span").addClass("glyphicon-unchecked");
		}
	});

	$("#edit-story").on("click", function(){
		var desc = $("#story-desc").children("p").html();
		$("#story-desc-form").children("textarea").val(desc);
		$("#story-desc-form").show();
		$("#story-desc").hide();
		$(".edit-rights").show();
		$("#edit-story").hide();
		$("#draft").show();
	});

	$("#story-edit-save-btn").on("click", function(e){
		// e.preventDefault();
		var desc = $("#story-desc-form").children("textarea").val();
		//console.log(desc);
		$("#story-desc").children("p").html(desc);
	 	$("#story-desc-form").children("textarea").val("");
		$("#story-desc-form").hide();
		$("#story-desc").show();
		$(".edit-rights").hide();
		$("#edit-story").show();
		$("#draft").show();
	});

	$("#story-edit-cancel-btn").on("click", function(){
		$("#story-desc-form").hide();
		$("#story-desc").show();
		$(".edit-rights").hide();
		$("#edit-story").show();
		$("#draft").hide();
	});

	$("#publish-story").on("click", function(){
		var desc = $("#story-desc-form").children("textarea").val();
		//console.log(desc);
		$("#story-desc").children("p").html(desc);
	 	$("#story-desc-form").children("textarea").val("");
		$("#story-desc-form").hide();
		$("#story-desc").show();
		$(".edit-rights").hide();
		$("#edit-story").show();
		$("#draft").hide();
	});

	if (localStorage["name"]) {
     $("#edit-story").show();
	}
	else{
	      $("#edit-story").hide();   
	}
	
});