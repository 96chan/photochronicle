/*
 *** Google Map API
 https://developers.google.com/maps/documentation/javascript/tutorial#Audience
 */
var markers_modal = [];
var markers_overview  = [];
var bounds_overview = new google.maps.LatLngBounds();
var marker_over;
var marker_modal;
var map_canvas;
var map_modal;
var saved_latlng;
var bk_latlng = new google.maps.LatLng(37.8715, -122.2600);     // Berkeley
var sg_latlng = new google.maps.LatLng(37.87016, -122.25947);   // Sather Gate
var st_latlng = new google.maps.LatLng(37.87205,-122.25783);    // Sather Tower
var hgt_latlng = new google.maps.LatLng(37.87362,-122.25415);   // Hearst Greek Theatre
var hmmb_latlng = new google.maps.LatLng(37.87448,-122.25725);  // Hearst Memorial Mining Building
var pizzaiolo_latlng = new google.maps.LatLng(37.83691, -122.26236); // Pizzaiolo

var maxStory = 3;
var storyLikes={"story1Likes":250, "story2Likes": 500, "story3Likes": 56};

function initialize_map_modal() {
    var mapOptions = {
        zoom: 7,
        center: new google.maps.LatLng(37.8715, -122.2600),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    };
    var styles = [
      {
        "elementType": "labels.icon",
        "stylers": [
        { "visibility": "off" }
        ]
      },
    ];
    map_modal = new google.maps.Map(document.getElementById('new-location-map-modal'),mapOptions);
    map_modal.setOptions({styles: styles});   
    var searchbutton = /** @type {HTMLInputElement} */(document.getElementById('searchbuttonmodal'));
    map_modal.controls[google.maps.ControlPosition.TOP_RIGHT].push(searchbutton);
    // Create the search box and link it to the UI element.
    var input = /** @type {HTMLInputElement} */(document.getElementById('mapsearchboxmodal'));
    map_modal.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

    var msg = /** @type {HTMLInputElement} */(document.getElementById('infolocationchosen'));
    map_modal.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(msg);

    var searchBox = new google.maps.places.SearchBox(/** @type {HTMLInputElement} */(input));
    google.maps.event.addListener(map_modal, 'click', function(event){
        addMarker2modal(event.latLng, map_modal);
    });
    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function () {
        var places = searchBox.getPlaces();
        addMarker2modal(places[0].geometry.location);
        var bounds_modal = new google.maps.LatLngBounds();
        bounds_modal.extend(places[0].geometry.location);
        map_modal.fitBounds(bounds_modal);
        map_modal.setZoom(14);
        var el = document.getElementById("mapsearchboxmodal");
        el.value = "";
        $('#infolocationchosen').show();
    });
    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map_modal, 'bounds_changed', function () {
        var bounds = map_modal.getBounds();
        searchBox.setBounds(bounds);
    });
}
function addMarker2modal(latLng){
    //clear the previous marker and circle.
    if(marker_modal != null){
        marker_modal.setMap(null);
    }
    marker_modal = new google.maps.Marker({
        position: latLng,
        map: map_modal,
        draggable:true
    });
    maker = marker_modal;
    saved_latlng = latLng;
}
function addMarker2over(latLng){
    //clear the previous marker and circle.
    marker_over = new google.maps.Marker({
        position: latLng,
        map: map_canvas,
        draggable:true
    });
    maker = marker_over;
    saved_latlng = latLng;
}
function initialize_tour_map_canvas() {
    var mapOptions = {
        zoom: 13,
        center: pizzaiolo_latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    };
    var styles = [
      {
        "elementType": "labels.icon",
        "stylers": [
        { "visibility": "off" }
        ]
      },
    ];
    map_canvas = new google.maps.Map(document.getElementById('tour-map-canvas'), mapOptions);
    map_canvas.setOptions({styles: styles});
    addMarker2over(pizzaiolo_latlng);
    bounds_overview.extend(pizzaiolo_latlng);
//    map_canvas.fitBounds(bounds_overview);
    map_canvas.setZoom(13);
}

/* =====================

 Document Ready

 ====================== */
$(document).ready(function() {
    // init();
    google.maps.event.addDomListener(window, "load", initialize_tour_map_canvas);
    google.maps.event.addDomListener(window, "load", initialize_map_modal);
    $('#save_or_publish').hide();
    $('#save_or_edit').show();
  // getting login name  
  if (localStorage["name"]) {
      $('#input-name').val(localStorage["name"]);
      $('#signin').hide();
      $('#after-signin').text('Welcome, '+localStorage["name"]+'!' );
      if($('#nav-my-page').hasClass('invisible')){
         $('#nav-my-page').removeClass('invisible');        
      }
      $('#nav-my-page').addClass('visible');
  }else{
      $('#signout').hide();
      $('#after-signin').hide();
      $('#signin').show();      
      if($('#nav-my-page').hasClass('visible')){
         $('#nav-my-page').removeClass('visible');        
      }
      $('#nav-my-page').addClass('invisible');
  }
});

//***********************
// Sign-In Function (Chan)
//***********************
// Show a signin modal
$('#signin').click(function(){
    $('#signin-modal').modal('toggle');
});

// Signin Validataion 
$('#form-signin').delegate('input','keyup',function(){
    $el = $(this);
    if($el.val().length>0){
        $el.parent().addClass("has-success");
        $el.parent().removeClass("has-error");
    }else{
        $el.parent().addClass("has-error");
        $el.parent().removeClass("has-success");
    }
});
$('#form-signin').submit(function(){
    if($('#input-name').val().length==0 || $('#input-password').val().length==0){
        $(this).addClass('has-error');
        $(this).removeClass('has-success');
    }else{
        localStorage['name'] = $('#input-name').val();
        $('#after-signin').show();
        $('#after-signin').text('Welcome, '+localStorage["name"]+'!');
        $('#signin').hide();
        $('#signout').show();
        $('#signin-modal').modal('hide');
      if($('#nav-my-page').hasClass('invisible')){
         $('#nav-my-page').removeClass('invisible');        
      }
      $('#nav-my-page').addClass('visible');
        tour_detail_loaded();
    }
    return false;
});
$('#signout').click(function(){
    localStorage.clear();
    $('#signin').show();
    $('#after-signin').hide();
    $('#signout').hide();

    if($('#nav-my-page').hasClass('visible')){
         $('#nav-my-page').removeClass('visible');        
    }
    $('#nav-my-page').addClass('invisible');
    tour_detail_loaded();
});
$('#mapModalLink').click(function(){
    $('#myModal').modal('show');
});
//***********************

//  READ IMAGE FILES
function errorHandler(e) {
    var msg = '';

    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
        case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
        default:
            msg = 'Unknown Error';
            break;
    };

    console.log('Error: ' + msg);
};
var file_index = 1;
$('#directory-selector').change(function(e) {
    $('#extras').append('<div class=\"extra_item thumbnail\"><a href=\"#\"><img src=\"img/sather_gate_' + file_index + '.jpg\"></a>date: <input type=\"text\" size=\"8\"></div>');
    file_index += 1;
});

function tour_detail_loaded() {
    // getting login name
    $('.hide_on_load').hide();

    $('#edit_button').on('click', function() {
        $('#save_or_publish').show();
        $('#edit_or_not').hide();
        $('#title_bar h5').hide();
        $('.hide_on_load').show();
        $('#title_bar textarea').val($('#title_bar h5').text());
        $('#title_bar textarea').attr("cols", "100");
    });

    $('#save_or_publish').on('click', function(e) {
        $('#save_or_publish').hide();
        $('#edit_or_not').show();
        $('.hide_on_load').hide();
        $('#title_bar h5').show();
        if(e.target.id !== $('#cancel_button').attr('id')) {
            $('#title_bar h5').text($('#title_bar textarea').val());
        }
    });

    $('#publish_button').on('click', function(e) {
        $('#title_bar h1 small').hide();
    });

    $('.remove_a').on('click', removeFunction);
}

var removeFunction  = function (event) {
    $(event.target.parentElement).animate({
            opacity: 0.25
            ,left: '+=50'
            ,height: 'toggle'
        }
        , 500
        , function() {
            $(event.target.parentElement.parentElement).remove();
        });
};


$('#addnewlocation').on('shown', function () {
    //google.maps.event.addDomListener(window, "load", initialize_modal);
    //initialize_modal();
    google.maps.event.trigger(map_modal, "resize");
});

$('#mapModalLink').on('click', function () {
    $("#addnewlocation").show();
    google.maps.event.trigger(map_modal, 'resize');
});


$('#saveLocationButton').on('click', function(event) {
    addMarker2over(saved_latlng);
    bounds_overview.extend(saved_latlng);
    map_canvas.fitBounds(bounds_overview);
    // map_canvas.setZoom(12);

    //markers[0].position.ob+markers[0].position.pb
    //marker.position.ob+marker.position.pb
    $("#tourstorieslist").append("<div class=\"thumbnail each-story-container\" ><h4>"+$("#locationReferenceName").val()+"<div class=\"no_break_float_right hide_on_load\"><small><a href=\"#\" onclick=\"$('#addStoryModal').modal(\'show\');\" id=\"mapModalLink\"><i class=\"fa fa-plus-circle\"></i> add stories</a></small></div></h4>No stories here yet! Please click on add stories...</div>");
    $("#locationlist").append("<div class=\"thumbnail\"><h4>"+$("#locationReferenceName").val()+"</h4><p class=\"text-right hide_on_load\"><a href=\"#\" class=\"remove_a\">remove from tour</a></p></div>")
    $('#addnewlocation').modal('hide');
});

$('#searchstorytab').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});

$('#addnewstorytab').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});

//$('#story_desc').wysihtml5();
