
//
var turf = require('@turf/turf');
var scoreNeighborhoods = require('./score-neighborhoods.js');

//
module.exports = go = (geoJSON) => {
    let centroids = kMeansClustering(geoJSON);
    return scoreNeighborhoods(centroids);
};
//
function kMeansClustering(ptsJSON) {
  var options = {numberOfClusters: 5};
  var clustered = turf.clustersKmeans(ptsJSON, options);
  return getCentroids(clustered);
}

//
function getCentroids(cluster) {
    var centroids = {};
    cluster.features.forEach(function(element) {
        var centroidNumber = element.properties.cluster;
        if (!centroids[centroidNumber]) {
            centroids[centroidNumber] = {
                coords: element.properties.centroid, 
                count: 0
            };
        } else {
            var count = centroids[centroidNumber].count;
            centroids[centroidNumber].count = count+1;
        }
    });
    return centroids;
}

// //
// var turf = require('@turf/turf');
// var superSearch = require('../controllers/superSearch');
// var request = require('request-promise');

// //
// const locations = require('locations.js');

// //
// var neighborhoods = [];

// //
// module.exports = go = (geoJSON) => {
//     centroids = kMeansClustering(geoJSON);
//     for (var centroid in centroids) {
//         let response = superSearch(centroid);
//         neighborhoods.push(response);
//     }
// }

// //
// function kMeansClustering(ptsJSON) {
//   var options = {numberOfClusters: 5};
//   var clustered = turf.clustersKmeans(ptsJSON, options);
//   return getCentroids(clustered);
// };

// //
// function getCentroids(cluster) {
//     var centroids = {};
//     cluster.features.forEach(function(element) {
//         if (Object.keys(centroids).indexOf(element.properties.cluster) === -1) {
//             var centroidNumber = element.properties.cluster;
//             centroids[centroidNumber] = element.properties.centroid;
//         };
//     })
//     return centroids;
// };
