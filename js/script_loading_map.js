/*
*** Google Map API
https://developers.google.com/maps/documentation/javascript/tutorial#Audience
*/
var markers = [];
var map_modal;

function initialize_map_modal() {
    var mapOptions = {
        zoom: 7,
        center: new google.maps.LatLng(37.397, -122.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    };
    map_modal = new google.maps.Map(document.getElementById('map-modal'),
        mapOptions);

    var searchbutton = /** @type {HTMLInputElement} */(document.getElementById('searchbuttonmodal'));
    map_modal.controls[google.maps.ControlPosition.TOP_RIGHT].push(searchbutton);

    // Create the search box and link it to the UI element.
    var input = /** @type {HTMLInputElement} */(document.getElementById('mapsearchboxmodal'));
    map_modal.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

    var searchBox = new google.maps.places.SearchBox(/** @type {HTMLInputElement} */(input));


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
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map_modal,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });

            markers.push(marker);
            bounds.extend(place.geometry.location);
        }

        map_modal.fitBounds(bounds);
    });

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map_modal, 'bounds_changed', function () {
        var bounds = map_modal.getBounds();
        searchBox.setBounds(bounds);
    });

}

/* =====================

	Document Ready

====================== */
$(document).ready(function() {
  google.maps.event.addDomListener(window, "load", initialize_map_modal);
});

$('#createNewTourModal').on('shown', function () {
    //google.maps.event.addDomListener(window, "load", initialize_modal);
    //initialize_modal();
    google.maps.event.trigger(map_modal, "resize");
});

$('#mapModalLink').on('click', function () {
    $("#createNewTourModal").show();
    google.maps.event.trigger(map_modal, 'resize');
});










