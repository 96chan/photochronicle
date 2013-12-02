var storyLikes={"story1Likes":200, "story2Likes": 100, "story3Likes3": 56}; 
/* =====================

	Document Ready

====================== */
$(document).ready(function() {
	
	$("#story-desc-form").hide();
 	$(".edit-rights").hide();
 	$("#draft").hide();
 	$(".remove-small-img").hide();

 	showLargeImg();

	//increase Like counts
	$(".like-btn").on("click", function(){
		var likeCount = $(this).next(".like-count");
		var storyNum = $(this).attr("for");
		storyLikes[storyNum] = storyLikes[storyNum]+ 1;
		likeCount.html(storyLikes[storyNum]);
	});

	//Make Private flag checkable
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

	//Click on Edit button to display user's editing rights, 
	//including: save as draft, private button, cancel and add photos. Show draft indicator next to story title
	$("#edit-story").on("click", function(){
		var desc = $("#story-desc").children("p").html();
		$("#story-desc-form").children("textarea").val(desc);
		$("#story-desc-form").show();
		$("#story-desc").hide();
		$(".edit-rights").show();
		$("#edit-story").hide();
		$("#draft").show();
		$(".remove-small-img").show();
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
		$(".remove-small-img").hide();
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
		$(".remove-small-img").hide();
	});
	// end code for editing rights

	//only show edit button if user has logged in
	if (localStorage["name"]) {
     $("#edit-story").show();
	}
	else{
	      $("#edit-story").hide();   
	}

	//Delet an image from the photo timeline
	$(".remove-small-img").on("click", function(){
		var path = $(".large-img").children("img").attr("src");
		if (path == $(this).prev("img").attr("src")){
			var nextimg = $(this).parent().next("li.event");
			var newpath = nextimg.children("img").attr("src");
			$(".large-img").children("img").attr("src", newpath);
		}
		$(this).parent().hide();
	});

//add photo model actions
	$('#add-img').on('click', function(e) {
    	$('#add_new_photo-modal').modal('toggle');
 	});

	$('#add_new_photo_cancel').on('click', function (e) {
	    $('#add_new_photo-modal').modal('toggle');
	});
	
	$('#add_new_photo_save').on('click', function (e) {
	    $('#add_new_photo-modal').modal('toggle');
	    // var title = $('.new_story_container h4 input[type=text]').val();

	    $('#extras').children().eq(1).remove();
	    $('.new_photo_container textarea').val('');

	    $("#year2010").before("<li class='event'><img src='img/sather_gate_15.jpg' class='small-img'/></li>");
	    showLargeImg();
	});
	
});

function showLargeImg(){
	//Display enlarged image when click on small image on timeline
	// $(".timeline > .event").on("click", function(){
		$(".small-img").on("click", function(){
		// var path = $(this).children("img").attr("src");
		var path = $(this).attr("src");
		var canDel = $(this).next(".remove-small-img").length;
		console.log(canDel);
		var user = "Anonymous";
		if (canDel){
			if (localStorage["name"]){
				user = localStorage["name"];
			}
		}
		$(".large-img").find(".img-creator").html("Added by: "+user + "<span class='glyphicon glyphicon-user'> </span>");
		$(".large-img").children("img").attr("src", path);
	});
}
$('#form-signin').submit(function(){
    if($('#input-name').val().length==0 || $('#input-password').val().length==0){
    }else{
	     $("#edit-story").show();
    }
    return false;
});
// Clicking Sign Out
$('#signout').click(function(){
     $("#edit-story").hide();
});
