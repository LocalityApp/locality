//
////////////////////////////////////////
//
// google-maps-service.js
// created by jacob yelton 2018-09-05
//
////////////////////////////////////////
//
// declare empty global variables
var map;
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
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

}