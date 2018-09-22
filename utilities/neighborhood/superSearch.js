const d3 = require('d3-geo');
const fs = require('fs');
const content  = fs.readFileSync(__dirname + '/ZillowNeighborhoodsCO.json');
const neighborhoods = JSON.parse(content);
const turf = require('@turf/turf');
var scoring_array = [];
module.exports = function findNeighborhood(coordPair){
    let indexOfFound = 0;
    let found = false;
    while (!found)
    {
        found = turf.booleanPointInPolygon(coordPair, neighborhoods.features[indexOfFound]);
        // found = d3.geoContains(neighborhoods.features[indexOfFound], coordPair);
        indexOfFound++;
    }
    console.log(neighborhoods.features[indexOfFound]);
    scoring_array.push(indexOfFound);
    console.log(scoring_array);
    return indexOfFound;
};

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
