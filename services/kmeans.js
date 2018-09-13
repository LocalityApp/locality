
//
var turf = require('@turf/turf');
var superSearch = require('../controllers/superSearch');
var request = require('request-promise');

//
var neighborhoods = [];
//
module.exports = go = (geoJSON) => {
    centroids = kMeansClustering(geoJSON);
    for (var centroid in centroids) {
        let response = superSearch(centroid);
        neighborhoods.push(response);
    }
}

//
function kMeansClustering(ptsJSON) {
  var options = {numberOfClusters: 5};
  var clustered = turf.clustersKmeans(ptsJSON, options);
  return getCentroids(clustered);
};

//
function getCentroids(cluster) {
    var centroids = {};
    cluster.features.forEach(function(element) {
        if (Object.keys(centroids).indexOf(element.properties.cluster) === -1) {
            var centroidNumber = element.properties.cluster;
            centroids[centroidNumber] = element.properties.centroid;
        };
    })
    return centroids;
};
