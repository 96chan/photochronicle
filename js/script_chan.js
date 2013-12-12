/*
*** Google Map API
https://developers.google.com/maps/documentation/javascript/tutorial#Audience
*/
var markers = [];
var map_canvas;
var map_modal;
var marker;
var sf_latlng = new google.maps.LatLng(37.78416,  -122.47572); 
var bk_latlng = new google.maps.LatLng(37.8715, -122.2600);     // Berkeley
var sg_latlng = new google.maps.LatLng(37.87016, -122.25947);   // Sather Gate
var st_latlng = new google.maps.LatLng(37.87205,-122.25783);    // Sather Tower
var hgt_latlng = new google.maps.LatLng(37.87362,-122.25415);   // Hearst Greek Theatre
var hmmb_latlng = new google.maps.LatLng(37.87448,-122.25725);  // Hearst Memorial Mining Building

var maxStory = 3;
var storyLikes={"story1Likes":250, "story2Likes": 500, "story3Likes": 56}; 

function initialize_map_canvas() {
    var mapOptions = {
        zoom: 13,
        center: sf_latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
    };
    var styles = [
      {
        "elementType": "labels.icon",
        "stylers": [
        { "visibility": "off" }
        ]
      },

    ];
    map_canvas = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);   
    map_canvas.setOptions({styles: styles});

    var sg_marker = createMarker(sg_latlng, '<h2>Sather Gate</h2><p class="info-address">Sather Rd, Berkeley, CA 94720</p></br><p class="info-story">4 Stories</p><p class="info-tour">2 Tours</p><a href="location_stories" class="info-view-more">View More</a>');
    var st_marker = createMarker(st_latlng, '<h2>Sather Tower</h2><p class="info-address">S Hall Rd, Berkeley, CA 94720</p></br><p class="info-story">4 Stories</p><p class="info-tour">2 Tours</p><a href="#" class="info-view-more">View More</a>');
    var hgt_marker = createMarker(hgt_latlng, '<h2>Hearst Greek Theatre</h2><p class="info-address">2001 Gayley Rd, Berkeley, CA 94720</p></br><p class="info-story">4 Stories</p><p class="info-tour">2 Tours</p><a href="#" class="info-view-more">View More</a>');
    var hmmb_marker = createMarker(hmmb_latlng, '<h2>Hearst Memorial Mining Building</h2><p class="info-address">Hearst Memorial Mining Building, Berkeley, CA 94720</p></br><p class="info-story">4 Stories</p><p class="info-tour">2 Tours</p><a href="#" class="info-view-more">View More</a>');

    var searchbutton = document.getElementById('searchbutton');
    map_canvas.controls[google.maps.ControlPosition.TOP_CENTER].push(searchbutton);
    var input = document.getElementById('mapsearch-form-canvas');
    map_canvas.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    var searchBox = new google.maps.places.SearchBox(input);
    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function () {
        var places = searchBox.getPlaces();
        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }
        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map_canvas,
                // icon: image,
                title: place.name,
                position: place.geometry.location
            });
            markers.push(marker);
            bounds.extend(place.geometry.location);
        }
        if(markers.length==1){bounds.extend(bk_latlng);}
        map_canvas.fitBounds(bounds);
    });
    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map_canvas, 'bounds_changed', function () {
        var bounds = map_canvas.getBounds();
        searchBox.setBounds(bounds);
        if(searchBox.getPlaces()[0].formatted_address !== 'UC Berkeley, Berkeley, CA, United States' && $(document).find('#tour-story-container').length > 0){
          $('#tour-story-container').show();
        }
    });
    google.maps.event.addListener(map_canvas, 'click', function() {
      infowindow.close();
    });

}
var infowindow = new google.maps.InfoWindow({ 
    size: new google.maps.Size(150,50)  
});
    
function createMarker(latlng, html) {
    var contentString = html;
    var marker = new google.maps.Marker({
        position: latlng,
        map: map_canvas,
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map_canvas,marker);
    });
}
function addMarker(latLng){
    //clear the previous marker and circle.
    if(marker != null){
        marker.setMap(null);
    }
    marker = new google.maps.Marker({
        position: latLng,
        map: map_modal,
        draggable:true
    });
}
function initialize_tour_map_canvas() {
   mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  // map = new google.maps.Map(document.getElementsByClassName('tour-map-canvas'),
  //     mapOptions);
  $(document.getElementsByClassName('tour-map-canvas')).each(function(){
        var map = new google.maps.Map($(this)[0], mapOptions);
    });
 }

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
    map_modal = new google.maps.Map(document.getElementById('map-modal'),
        mapOptions);
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
        addMarker(event.latLng, map_modal);
    });
    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function () {
        var places = searchBox.getPlaces();
        var marker_temp = new google.maps.Marker({
                //position: bk_latlng,
                map: map_modal,
                position: places[0].geometry.location,
                draggable:true
        });
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(places[0].geometry.location);
        marker = marker_temp;
        map_modal.fitBounds(bounds);
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
        $('#form-new-tour').removeClass('has-error');
    });
}

/* =====================

	Document Ready

====================== */
$(document).ready(function() {
  if(localStorage["intro-viewed"]){
    $('#intro-container').hide();
  }
  if($(document).find('#map-canvas').length > 0){
    var height = $(document).height()-54;
    $('#map-canvas').css('height',height);
    $('#intro-text').css('height',height);
    $('#map-canvas').css('width',$(document).width());
    google.maps.event.addDomListener(window, "load", initialize_map_canvas);
  }else if($(document).find('.tour-map-canvas').length > 0){
    google.maps.event.addDomListener(window, "load", initialize_tour_map_canvas);
  }
  if($(document).find('#map-modal').length > 0){
    google.maps.event.addDomListener(window, "load", initialize_map_modal);
  }
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
  $("#myModal").show();
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
// Submitting a form
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
    }
    return false;
});
// Clicking Sign Out
$('#signout').click(function(){
    localStorage.clear();
    $('#signin').show();
    $('#after-signin').hide();
    $('#signout').hide();
    if($('#nav-my-page').hasClass('visible')){
         $('#nav-my-page').removeClass('visible');        
    }
    $('#nav-my-page').addClass('invisible');
});
$('#mapModalLink').click(function(){
  $('#myModal').modal('show');
});

$('#intro-container').click(function(){
  localStorage["intro-viewed"] = true;
  $('#intro-container').hide();
});

//***********************


$('#createNewTourModal').on('shown', function () {
    //google.maps.event.addDomListener(window, "load", initialize_modal);
    //initialize_modal();

    google.maps.event.trigger(map_modal, "resize");
});

$('#mapModalLink').on('click', function () {
    $("#createNewTourModal").show();
    google.maps.event.trigger(map_modal, 'resize');
});

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
  file_index += 1;
  $('#extras').append('<div class=\"extra_item thumbnail\"><a href=\"#\"><img src=\"img/sather_gate_' + file_index + '.jpg\"></a>date: <input type=\"text\" size=\"8\"></div>');
});

function tour_detail_loaded() {
  // getting login name  
  $('#save_or_publish').hide();
  $('.hide_on_load').hide();

  if (localStorage["name"]) {
      $('#edit_or_not').show();
  } else {
      $('#edit_or_not').hide();
  }

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

  $('#add_story').on('click', function(e) {
    $('#add_new_story-modal').modal('toggle');
  });

  $('#add_new_story_cancel').on('click', function (e) {
    $('#add_new_story-modal').modal('toggle');
  });
  $('#add_new_story_save').on('click', function (e) {
    $('#add_new_story-modal').modal('toggle');
    var title = $('.new_story_container h4 input[type=text]').val();
    $('#sather_gate').append(
                '<div class=\"thumbnail\"> \
                  <p>' + title + '</p> \
                  <img src=\"img/sather_gate_' + file_index + '.jpg\"> \
                  <small class=\"hide_on_load remove_a\"><a href=\"#\">Remove from Location</a></small> \
                </div>');
    $('#extras').children().eq(1).remove();
    $('.new_story_container h4 input[type=text]').val('');
    $('#new_story_tag h4 input[type=text]').val('');
    $('.new_story_container textarea').val('');
    $('.remove_a').on('click', removeFunction);
  });
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
  return false;
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
    /*<div class="thumbnail">
        <h4>Hearst Greek Theatre</h4>
        <p class="text-right hide_on_load">
            <a href="#" class="remove_a">remove from tour</a>
        </p>
    </div>*/
    var bounds = new google.maps.LatLngBounds();
    markers.push(marker);

    for (var i = 0, temp_marker; temp_marker = markers[i]; i++) {
        markers_overview[i] = new google.maps.Marker({
            map: map_canvas,
            position: markers[i].position,
        });
        bounds.extend(markers[i].position);

    }
    map_canvas.fitBounds(bounds);

    //markers[0].position.ob+markers[0].position.pb
    //marker.position.ob+marker.position.pb
    $("#tourstorieslist").append("<div class=\"thumbnail\" style=\"background-color:#dddddd\"><h4>"+$("#locationReferenceName").val()+"<div class=\"no_break_float_right hide_on_load\"><small><a href=\"#\" onclick=\"$('#addStoryModal').modal(\'show\');\" id=\"mapModalLink\"><i class=\"fa fa-plus-circle\"></i> add stories</a></small></div></h4>No stories here yet! Please click on add stories...</div>");
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

// Submit a new tour form
$('#form-new-tour').submit(function(){
    if($('#newTourTitle').val().length==0 | $('#locationReferenceName').val().length==0 | marker==null){
        $(this).addClass('has-error');
        $(this).removeClass('has-success');
    }else{
        window.location='new_tour_detail.html'

    }
    return false;
});



