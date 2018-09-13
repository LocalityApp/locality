
//
var turf = require('@turf/turf');

//
module.exports = function kMeansClustering(ptsJSON) {
  var options = {numberOfClusters: 5};
  var clustered = turf.clustersKmeans(ptsJSON, options);
  getCentroids(clustered);
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
    console.log(centroids);
    // return centroids;
};
