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