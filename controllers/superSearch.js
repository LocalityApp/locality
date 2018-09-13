const d3 = require('d3-geo');
const fs = require("fs");
const content  = fs.readFileSync("ZillowNeighborhoodsCO.json");
const neighborhoods = JSON.parse(content);
var scoring_array = [];    
function findNeighborhood(coordPair){
    let indexOfFound = 0
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
findNeighborhood([-105.10390520095824,
    40.54884702483733]);
findNeighborhood([
        -104.92389678955078,
        39.75563654453609
      ]);

findNeighborhood([
        -104.9329948425293,
        39.745078163537045
      ]);
findNeighborhood([
        -104.91479873657225,
        39.74626606218367
      ]);
console.log(neighborhoods.features[mode(scoring_array)]);
// console.log(neighborhoods);