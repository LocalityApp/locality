var map;  
var nightspots;
var markers = [];
var locations = {
    'attractions': null,
    'education': null,
    'nightlife': null,
    'parks': null,
    'services': null, 
    'transit': null,
    'scoring': []
};

var polygon = {
    'attractions': '{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-104.96945336666683,39.75072000000009],[-104.96866169664378,39.75072000000009],[-104.96810472945879,39.750715119495204],[-104.96751749836118,39.75070541319606],[-104.96693144565978,39.75070413686946],[-104.96616929186015,39.75071633133028],[-104.96570030685758,39.750718035302086],[-104.96502596658881,39.75071250792283],[-104.96449794557834,39.75071349691997],[-104.9637064718412,39.750725961073414],[-104.96317861170348,39.75072781138479],[-104.9624749507799,39.75072213669998],[-104.96197659581905,39.750716235416604],[-104.96121397237998,39.75070393503837],[-104.96068632336208,39.750697693685964],[-104.96015857822978,39.750693403075076],[-104.95974000000001,39.750690000000006],[-104.95973113960298,39.75037102571045],[-104.95972999999998,39.7497849474186],[-104.95973100073894,39.749315908363],[-104.95973360163622,39.748993397106545],[-104.95973667733067,39.74861201099425],[-104.95973856889225,39.74837745735303],[-104.9597436697788,39.74796696904657],[-104.95975659556733,39.74714618146716],[-104.9597610506924,39.746735621893805],[-104.95976390347397,39.74620785729876],[-104.95976612316089,39.74579721523706],[-104.95976818350319,39.74541605191855],[-104.95977,39.74497628505661],[-104.95977996278127,39.74465391642464],[-104.95979973628971,39.7443305943343],[-104.9597915449056,39.74403843496684],[-104.95978166457634,39.743686036554706],[-104.95977427160254,39.7434223538266],[-104.95976932378821,39.743158425059946],[-104.95976701372479,39.74277726460483],[-104.9597654144502,39.74251338428972],[-104.95976381409862,39.74224932627729],[-104.95976132633812,39.74183884578716],[-104.95975999999997,39.74131114606102],[-104.95975999999997,39.74087132938159],[-104.95975999999997,39.74037287047837],[-104.95975999999997,39.74016114746476],[-104.95975999999997,39.74001000000008],[-104.96026260868247,39.74000176051348],[-104.9604218354124,39.73999915023926],[-104.96065309328206,39.739995359126496],[-104.96114461242665,39.73999265503923],[-104.96147704847228,39.73999801691089],[-104.96172299519606,39.74000198379353],[-104.9620265237594,39.740006879415574],[-104.96251807085729,39.74001000000008],[-104.96318311591195,39.74001000000008],[-104.96357346844411,39.74001000000008],[-104.96449874852023,39.74001000000008],[-104.96546740109997,39.74001000000008],[-104.96633480625097,39.74001294198602],[-104.96889076647817,39.7400239244224],[-104.97120697937868,39.74003387671384],[-104.97197327663544,39.74002000000011],[-104.97245037417468,39.74002000000011],[-104.97289855671154,39.74002000000011],[-104.97337999999998,39.74002000000011],[-104.97339155450231,39.74018083412169],[-104.97339628459055,39.740426798707716],[-104.97340212638302,39.74073057191946],[-104.97340824075691,39.74104851936143],[-104.97341185379602,39.74123639739527],[-104.97341741231776,39.74152544052444],[-104.97341793095774,39.74174224442815],[-104.9734106613442,39.74203121156869],[-104.9734037369228,39.74230645731346],[-104.97339902081823,39.7424939224741],[-104.97339173291631,39.74278361657578],[-104.97338845244593,39.74291401526976],[-104.97338192808212,39.74317335873477],[-104.97338199935497,39.74330398258313],[-104.97338839630407,39.743476700210444],[-104.9733935924864,39.74361699713394],[-104.97339999999996,39.74379000000002],[-104.97340124507599,39.74389956668605],[-104.97344009892839,39.74489013277797],[-104.97340872916445,39.745005854124514],[-104.973395156478,39.7451339046539],[-104.97335965230543,39.74529069538896],[-104.97326613011401,39.74544640413903],[-104.9731712900233,39.74555729872374],[-104.97301476177552,39.74568168506133],[-104.9728624035288,39.74577692081492],[-104.97271601310136,39.74587076083246],[-104.9725813907783,39.74596102424849],[-104.97243440152783,39.746070891014924],[-104.97234902836188,39.74616796218416],[-104.97227069450443,39.74632256923452],[-104.97223550212227,39.746486223470995],[-104.97222055990272,39.74667300121476],[-104.97221999999992,39.74683704210079],[-104.97221999999992,39.74697999999999],[-104.9722450640291,39.74717025611663],[-104.97231194221546,39.74731291332321],[-104.97244576637512,39.74747576637524],[-104.97259131488251,39.747588575211196],[-104.97272037818948,39.747676918793076],[-104.97286135803034,39.74777090535365],[-104.97303849382678,39.74789953086398],[-104.97310087346095,39.74794951427837],[-104.97324000000003,39.74806999999994],[-104.9733156424138,39.748192737356405],[-104.97335297825718,39.74843465194503],[-104.97335638817265,39.74864606670788],[-104.97336094083774,39.748928331937734],[-104.97336624515073,39.7492571993466],[-104.97336718026413,39.74972685780806],[-104.9733641004296,39.74998556390709],[-104.9733601848779,39.750314470255645],[-104.97335465308511,39.750549223508216],[-104.97335168068696,39.75078956236317],[-104.97109528640736,39.750701655535565],[-104.97056775110968,39.75070519756268],[-104.97009873533068,39.75071276233345],[-104.96945336666683,39.75072000000009]]]},"properties":{"State":"CO","County":"Denver","City":"Denver","Name":"City Park West","RegionID":"268637"}}',
    'education': '{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-104.98747008376239,39.747509227424544],[-104.98750993272155,39.7400899942521],[-104.98814002471488,39.740089916011044],[-104.98893997345866,39.74059021335246],[-104.98974002922172,39.74019000335825],[-104.9904400012346,39.74008999515147],[-104.99811002924093,39.740183801633606],[-104.99980334110614,39.74218346395085],[-105.00044016722279,39.74358996673247],[-105.00051240757213,39.745487184553625],[-105.00034931945765,39.7456105444338],[-104.99977980112232,39.74609517125586],[-104.99928463326592,39.74647526195291],[-104.99875282147957,39.74686288389039],[-104.9980317746844,39.747403668986735],[-104.9974669096017,39.747837497345216],[-104.99684847509418,39.74832734646],[-104.99633614575168,39.74873315187993],[-104.99567320363145,39.749258254549275],[-104.99505909631455,39.74971804333437],[-104.99437680203951,39.75019817634265],[-104.99381870089893,39.75062301705762],[-104.99312547967867,39.75119286839973],[-104.99251740394526,39.75166444704111],[-104.99210984286091,39.75197011785448],[-104.9919192261108,39.75211308041689],[-104.99170999999996,39.752269999999996],[-104.99140433814058,39.75204514529892],[-104.99106913514002,39.751798559183484],[-104.9906032590203,39.75143033893275],[-104.99024315176197,39.751126634016245],[-104.98982062517075,39.75078151291805],[-104.98929628791242,39.75037038484042],[-104.98889550081122,39.75006873654759],[-104.98832080374814,39.74964901397338],[-104.98806385549027,39.74945952258547],[-104.98749550564104,39.749038522697006],[-104.98734999999999,39.74891999999993],[-104.98738796561962,39.74762022878305],[-104.98739151638365,39.747514880896546],[-104.98747008376239,39.747509227424544]]]},"properties":{"State":"CO","County":"Denver","City":"Denver","Name":"Central Business District","RegionID":"268632"}}',
    'nightlife': '{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-104.98747008376239,39.747509227424544],[-104.98750993272155,39.7400899942521],[-104.98814002471488,39.740089916011044],[-104.98893997345866,39.74059021335246],[-104.98974002922172,39.74019000335825],[-104.9904400012346,39.74008999515147],[-104.99811002924093,39.740183801633606],[-104.99980334110614,39.74218346395085],[-105.00044016722279,39.74358996673247],[-105.00051240757213,39.745487184553625],[-105.00034931945765,39.7456105444338],[-104.99977980112232,39.74609517125586],[-104.99928463326592,39.74647526195291],[-104.99875282147957,39.74686288389039],[-104.9980317746844,39.747403668986735],[-104.9974669096017,39.747837497345216],[-104.99684847509418,39.74832734646],[-104.99633614575168,39.74873315187993],[-104.99567320363145,39.749258254549275],[-104.99505909631455,39.74971804333437],[-104.99437680203951,39.75019817634265],[-104.99381870089893,39.75062301705762],[-104.99312547967867,39.75119286839973],[-104.99251740394526,39.75166444704111],[-104.99210984286091,39.75197011785448],[-104.9919192261108,39.75211308041689],[-104.99170999999996,39.752269999999996],[-104.99140433814058,39.75204514529892],[-104.99106913514002,39.751798559183484],[-104.9906032590203,39.75143033893275],[-104.99024315176197,39.751126634016245],[-104.98982062517075,39.75078151291805],[-104.98929628791242,39.75037038484042],[-104.98889550081122,39.75006873654759],[-104.98832080374814,39.74964901397338],[-104.98806385549027,39.74945952258547],[-104.98749550564104,39.749038522697006],[-104.98734999999999,39.74891999999993],[-104.98738796561962,39.74762022878305],[-104.98739151638365,39.747514880896546],[-104.98747008376239,39.747509227424544]]]},"properties":{"State":"CO","County":"Denver","City":"Denver","Name":"Central Business District","RegionID":"268632"}}',
    'parks': '{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-104.94072986994509,39.72559010286595],[-104.94070001964828,39.71462999604704],[-104.94071339616417,39.71143563657445],[-104.94077035562425,39.71143787498684],[-104.94726173487688,39.71154867505836],[-104.94796305988436,39.711554471132914],[-104.94799227875924,39.71157919479621],[-104.94914024869941,39.71253176559773],[-104.95031264353165,39.713484336398906],[-104.95097467370739,39.713910728715646],[-104.9517537121798,39.714412482307836],[-104.95231548470367,39.71473000590814],[-104.9535935887906,39.71521191045978],[-104.9539763773828,39.71534062821685],[-104.95426947609094,39.71541390289384],[-104.95485567350707,39.71560930203249],[-104.9553930211387,39.715731426494145],[-104.95607691812423,39.71578027627899],[-104.95663869064802,39.71582912606365],[-104.95739586231055,39.71582912606365],[-104.95800648461918,39.71578027627899],[-104.95927866918655,39.715620416699814],[-104.95932998180355,39.71829003435866],[-104.9595200004545,39.72096999422095],[-104.95941999494546,39.72248000806869],[-104.95942400324938,39.72253867532961],[-104.95940999999989,39.72255000000014],[-104.95940589232853,39.72319901209621],[-104.95940427468801,39.723454599286114],[-104.95940179603447,39.72384622655753],[-104.95940000000003,39.72413000000013],[-104.9593980143825,39.72420346784341],[-104.95939384946654,39.72435756973759],[-104.95940031077171,39.72456186463077],[-104.95943713810524,39.72478282863217],[-104.95948598671573,39.724919565461235],[-104.95958844983728,39.7250558634885],[-104.9597356385092,39.725176884649414],[-104.95989343858692,39.725280063152226],[-104.9599798528956,39.725345882316475],[-104.96013999999998,39.725600000000085],[-104.96014008591933,39.72560005014823],[-104.94072986994509,39.72559010286595]]]},"properties":{"State":"CO","County":"Denver","City":"Denver","Name":"Cherry Creek","RegionID":"268635"}}',
    'services': null, 
    'transit': null,
};
var customMarkers = {
    'attractions': {
        url: 'images/map-icons/attractions.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 27),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    },
    'education': {
        url: 'images/map-icons/school.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(25, 35),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    },
    'nightlife': {
        url: 'images/map-icons/restaurant.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(25, 36),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    },
    'parks': {
        url: 'images/map-icons/parks.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(26, 35),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    },
    'services': {
        url: 'images/map-icons/services.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(25, 34),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    }, 
    'transit': {
        url: 'images/map-icons/transit.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(25, 36),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    }
};
var userLocation = {
    lat:'',
    lng:''
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

function drop(context1, context2, context3, context4) {
    clearMarkers();
    for (var i = 0; i < locations[context1].dataPoints.length; i++) {
      let spot = locations[context1].dataPoints[i].geometry.coordinates;
      addMarkerWithTimeout({lat:spot[1], lng:spot[0]}, (i * 80), context1);
    }
    for (var j = 0; j < locations[context2].dataPoints.length; j++) {
        let spot = locations[context2].dataPoints[j].geometry.coordinates;
        addMarkerWithTimeout({lat:spot[1], lng:spot[0]}, ((i*80) + (j * 60)), context2);
    }
    for (var k = 0; k < locations[context3].dataPoints.length; k++) {
        let spot = locations[context3].dataPoints[k].geometry.coordinates;
        addMarkerWithTimeout({lat:spot[1], lng:spot[0]}, ((i*80) + (j * 60) + (k * 60)), context3);
        if(k == (locations[context3].dataPoints.length-3)){
            loadGeoJsonString(polygon[context1]); 
        }
      }
    for (var l = 0; l < locations[context4].dataPoints.length; l++) {
        let spot = locations[context4].dataPoints[i].geometry.coordinates;
        addMarkerWithTimeout({lat:spot[1], lng:spot[0]}, ((i*80) + (j * 60) + (k * 60) + (l*60)), context4);
    }
}

function addMarkerWithTimeout(position, timeout, context) {
    window.setTimeout(function() {
        markers.push(new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: customMarkers[context]
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

function loadGeoJsonString(geoString) {
    window.setTimeout(function() {
        var geojson = JSON.parse(geoString);
        map.data.addGeoJson(geojson);
        zoom(map);
    }, 20000);
    
  }