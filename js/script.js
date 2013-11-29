/*

*** Google Map API
https://developers.google.com/maps/documentation/javascript/tutorial#Audience


*/

var map;
var map_modal;

function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

// function initialize_modal() {
//     var mapOptions = {
//         zoom: 8,
//         center: new google.maps.LatLng(-34.397, 150.644),
//         mapTypeId: google.maps.MapTypeId.TERRAIN
//     };
//     map_modal = new google.maps.Map(document.getElementById('mapModal'),
//         mapOptions);

//     // Create the search box and link it to the UI element.
//     var input = /** @type {HTMLInputElement} */(document.getElementById('pac-input'));
//     map_modal.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//     var searchBox = new google.maps.places.SearchBox(/** @type {HTMLInputElement} */(input));
//     // Listen for the event fired when the user selects an item from the
//     // pick list. Retrieve the matching places for that item.
//     google.maps.event.addListener(searchBox, 'places_changed', function () {
//         var places = searchBox.getPlaces();

//         for (var i = 0, marker; marker = markers[i]; i++) {
//             marker.setMap(null);
//         }

//         // For each place, get the icon, place name, and location.
//         markers = [];
//         var bounds = new google.maps.LatLngBounds();
//         for (var i = 0, place; place = places[i]; i++) {
//             var image = {
//                 url: place.icon,
//                 size: new google.maps.Size(71, 71),
//                 origin: new google.maps.Point(0, 0),
//                 anchor: new google.maps.Point(17, 34),
//                 scaledSize: new google.maps.Size(25, 25)
//             };

//             // Create a marker for each place.
//             var marker = new google.maps.Marker({
//                 map: map,
//                 icon: image,
//                 title: place.name,
//                 position: place.geometry.location
//             });

//             markers.push(marker);

//             bounds.extend(place.geometry.location);
//         }

//         map_modal.fitBounds(bounds);
//     });

//     // Bias the SearchBox results towards places that are within the bounds of the
//     // current map's viewport.
//     google.maps.event.addListener(map, 'bounds_changed', function () {
//         var bounds = map_modal.getBounds();
//         searchBox.setBounds(bounds);
//     });

// }


/* =====================

	Document Ready

====================== */
$(document).ready(function() {
	// init();
    google.maps.event.addDomListener(window, "load", initialize);
    // google.maps.event.addDomListener(window, "load", initialize_modal);

  // getting login name  
  if (localStorage["name"]) {
      $('#input-name').val(localStorage["name"]);
      $('#signin').text('');
      $('#after-signin').text('Welcome, '+localStorage["name"]+'!' );
      $('#logout').text('Log out');
  }
});

// Sign-In Function
// Show a signin modal
$('#signin').click(function(){
    $('#myModal').modal('toggle');
});
$('#form-signin').submit(function(){
    localStorage['name'] = $('#input-name').val();
    $('#after-signin').text('Welcome, '+localStorage["name"]+'!');
    $('#signin').html('');
    $('#logout').text('Log out');
    $('#myModal').modal('hide');
    return false;
});
$('#logout').click(function(){
    localStorage.clear();
    $('#signin').html('<span class="glyphicon glyphicon-user"></span>&nbsp;Sign In');
    $('#after-signin').html('');
    $('#logout').html('');
});





$('#myModal').on('shown', function () {
    //google.maps.event.addDomListener(window, "load", initialize_modal);
    //initialize_modal();
    google.maps.event.trigger(map_modal, "resize");
});

$('#mapModalLink').on('click', function () {
    $("#myModal").show();
    google.maps.event.trigger(map_modal, 'resize');
});










