/*
*** Google Map API
https://developers.google.com/maps/documentation/javascript/tutorial#Audience
*/
var markers = [];
var map_canvas;
var map_modal;
var bk_latlng = new google.maps.LatLng(37.8715, -122.2600);     // Berkeley
var sg_latlng = new google.maps.LatLng(37.87016, -122.25947);   // Sather Gate
var st_latlng = new google.maps.LatLng(37.87205,-122.25783);    // Sather Tower
var hgt_latlng = new google.maps.LatLng(37.87362,-122.25415);   // Hearst Greek Theatre
var hmmb_latlng = new google.maps.LatLng(37.87448,-122.25725);  // Hearst Memorial Mining Building

function initialize_map_canvas() {
    var mapOptions = {
        zoom: 16,
        center: bk_latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    };
    map_canvas = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);   

    var sg_marker = createMarker(sg_latlng, '<h2>Sather Gate</h2><p class="info-address">Sather Rd, Berkeley, CA 94720</p></br><p class="info-like">200 Likes</p> <p class="info-story">4 Stories</p><p class="info-tour">2 Tours</p><a href="#" class="info-view-more">View More</a>');
    var st_marker = createMarker(st_latlng, '<h2>Sather Tower</h2><p class="info-address">S Hall Rd, Berkeley, CA 94720</p></br><p class="info-like">300 Likes</p> <p class="info-story">4 Stories</p><p class="info-tour">2 Tours</p><a href="#" class="info-view-more">View More</a>');
    var hgt_marker = createMarker(hgt_latlng, '<h2>Hearst Greek Theatre</h2><p class="info-address">2001 Gayley Rd, Berkeley, CA 94720</p></br><p class="info-like">500 Likes</p> <p class="info-story">4 Stories</p><p class="info-tour">2 Tours</p><a href="#" class="info-view-more">View More</a>');
    var hmmb_marker = createMarker(hmmb_latlng, '<h2>Hearst Memorial Mining Building</h2><p class="info-address">Hearst Memorial Mining Building, Berkeley, CA 94720</p></br><p class="info-like">80 Likes</p> <p class="info-story">4 Stories</p><p class="info-tour">2 Tours</p><a href="#" class="info-view-more">View More</a>');

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
            // var image = {
            //     url: place.icon,
            //     size: new google.maps.Size(71, 71),
            //     origin: new google.maps.Point(0, 0),
            //     anchor: new google.maps.Point(17, 34),
            //     scaledSize: new google.maps.Size(25, 25)
            // };
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
/* =====================

	Document Ready

====================== */
$(document).ready(function() {

  var height = $(document).height()-54;
  $('#map-canvas').css('height',height);
  $('#map-canvas').css('width',$(document).width());
	// init();
  google.maps.event.addDomListener(window, "load", initialize_map_canvas);

  // getting login name  
  if (localStorage["name"]) {
      $('#input-name').val(localStorage["name"]);
      $('#signin').hide();
      $('#after-signin').text('Welcome, '+localStorage["name"]+'!' );
  }else{
      $('#signout').hide();
      $('#after-signin').hide();
      $('#signin').show();      
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
    }
    return false;
});
$('#signout').click(function(){
    localStorage.clear();
    $('#signin').show();
    $('#after-signin').hide();
    $('#signout').hide();
});
$('#mapModalLink').click(function(){
  $('#myModal').modal('show');
});
//***********************



$('#myModal').on('shown', function () {
    //google.maps.event.addDomListener(window, "load", initialize_modal);
    //initialize_modal();
    google.maps.event.trigger(map_modal, "resize");
});

$('#mapModalLink').on('click', function () {
    $("#myModal").show();
    google.maps.event.trigger(map_modal, 'resize');
});










