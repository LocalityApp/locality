
//
var superSearch = require('../controllers/super-search');
var weightContexts = require('./weight-contexts.js');

//
var neighborhoods = {};

//
module.exports = go = (ptFeatures) => {
    getNeighborhoods(ptFeatures);
    weightContexts(neighborhoods);
};


//
function orderCentroids(ptObj) {
    var array = [];
    for (var pt in ptObj) {
        array.push(Object.values(ptObj[pt]));
    };
    array.sort(function(a, b){return b[1]-a[1]});
    return array;
};

//
function getNeighborhoods(pts) {
    var orderedPts = orderCentroids(pts);
    orderedPts.forEach(function(pt, index) {
        var coords = pt[0];
        var scorePts = 5-index;
        let response = superSearch(coords);
        scoreNeighborhoods(response, scorePts);
    });
};

//
function scoreNeighborhoods(neighborhoodCode, rank) {
    if (!neighborhoods[neighborhoodCode]) {
        neighborhoods[neighborhoodCode] = rank;
    };
};

// pull orderCentroids out and put into kmeans.js