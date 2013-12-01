/*
*** Google Map API
https://developers.google.com/maps/documentation/javascript/tutorial#Audience
*/
var markers = [];
var map_canvas;
var map_modal;
var bk_latlng = new google.maps.LatLng(37.8900, -122.2728);     // Berkeley

function initialize_map_canvas() {
    var mapOptions = {
        zoom: 7,
        center: bk_latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    };
    map_canvas = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
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
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map_canvas,
                icon: image,
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
}

/* =====================

	Document Ready

====================== */
$(document).ready(function() {
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
  /*
  var reader = new FileReader();
  var allfiles = e.target.files;
  var files = [];
  $.each(allfiles, function(i, item) {
    // if(item.name.indexOf(".jpg")>=0 || item.name.indexOf(".JPG")>=0)
      console.log(item);
      files.push(item);
  });

  var j = 0;
  var data;
  for(var i=0;i<files.length;i++) {
    console.log('i.........' + i);
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      var bb = (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)();
      bb.append(data);
      var fileSaver = window.saveAs(bb.getBlob(), files[0].name);
      // var jpeg = new $j(data, files[i]);
      $('#extras').append('<div class=\"extra_item thumbnail\"><a href=\"#\"><img src=\"' + files[0].name + '\"></a>date: <input type=\"text\" size=\"8\"></div>');
    };

    reader.readAsBinaryString(files[i]);
    // loadFiles(files);
  }
  function onInitFs(fs) {

    fs.root.getFile(files[0].name, {create: true, exclusive: true}, function(fileEntry) {

      // Create a FileWriter object for our FileEntry (log.txt).
      fileEntry.createWriter(function(fileWriter) {

        fileWriter.onwriteend = function(e) {
          console.log('Write completed.');
        };

        fileWriter.onerror = function(e) {
          console.log('Write failed: ' + e.toString());
        };

        // Create a new Blob and write it to log.txt.
        var blob = new Blob(data);

        fileWriter.write(blob);

      }, errorHandler);

    }, errorHandler);

  }

  window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
  window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
    */

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










