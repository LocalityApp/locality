var map;  
var nightspots;
var markers = [];
var userLocation = {
    lat:"",
    lng:""
};

var userImg = {
    url: 'images/user.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };

function markerWithContent(lat, lng, html, title){
    let position = {lat: lat, lng: lng};
    var contentString = html;

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
    return marker;
}
const userLocality = ()=>{
    navigator.geolocation.getCurrentPosition(function(position){  
        userLocality.lat = position.coords.latitude;
        userLocality.lng = position.coords.longitude;
        alert('Lat: ' + position.coords.latitude + ' ' +  
              'Lon: ' + position.coords.longitude);  
    });
};

const userMarker = userLocality =>{
    var usersPosition = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {lat: 59.327, lng: 18.067},
        icon: userImg
    }, setTimeout(usersPosition =>{
        usersPosition.animation = google.maps.Animation.BOUNCE;
    }, 500));

};

function drop() {
    clearMarkers();
    for (var i = 0; i < nightspots.dataPoints.length; i++) {
      let spot = nightspots.dataPoints[i].geometry.coordinates;
      addMarkerWithTimeout({lat:spot[1], lng:spot[0]}, i * 100);
    }
}

function addMarkerWithTimeout(position, timeout) {
    window.setTimeout(function() {
        markers.push(new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP
        }));
    }, timeout);
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
}
var userInputLocation;
var cityCenter;

cityCenter = {lat: 39.7392,lng: -104.9903};

// initialize function
function initialize() {

    // center point for search on denver
    var mapOptions = {
        zoom: 14, 
        center: cityCenter
    };

    // instance of Maps service center + zoom to userInputLocation
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

}