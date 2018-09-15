const d3 = require('d3-geo');
const fs = require("fs");
const content  = fs.readFileSync(__dirname + '/ZillowNeighborhoodsCO.json');
const neighborhoods = JSON.parse(content);
const geo = require("./locations");
var scoring_array = [];    
function findNeighborhood(coordPair){
    let indexOfFound = 0;
    let found = false;
    while (!found)
    {
        found = d3.geoContains(neighborhoods.features[indexOfFound], coordPair);
        indexOfFound++;
    }
    console.log(neighborhoods.features[indexOfFound]);
    scoring_array.push(indexOfFound);
    console.log(scoring_array);
    return indexOfFound;
}


function mode(array){
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++){
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;

}
function fillArr(){
    for(let i=0; i < geo.transit.dataPoints.length; i++){
        findNeighborhood(geo.transit.dataPoints[i].geometry.coordinates);
        console.log("#" + i);
        mode(scoring_array);
    }
    console.log('***' + mode(scoring_array));
    
}

var neighborhood = fillArr();
console.log(neighborhood);


// Attractions
// 252, 235, 272
// Education
// 252, 260
// Parks
// 260, 302, 202
// Nightlife
// 271, 252, 251
// Services
// 271, 251, 300 
// Transit
// 271, 252, 253