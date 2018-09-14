
//
const fs = require("fs");
const turf = require('@turf/turf');

//
const content  = fs.readFileSync(__dirname + "/ZillowNeighborhoodsCO.json");
const neighborhoods = JSON.parse(content);

//
var scoring_array = [];

//
module.exports = function findNeighborhood(coordPair){
    let indexOfFound = 0
    let found = false;
    while (!found)
    {
        found = turf.booleanPointInPolygon(coordPair, neighborhoods.features[indexOfFound]);
        indexOfFound++;
    }
    scoring_array.push(indexOfFound);
    return indexOfFound;
}