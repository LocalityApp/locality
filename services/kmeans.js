
//
var turf = require('@turf/turf');
var scoreNeighborhoods = require('./score-neighborhoods.js');

//
module.exports = go = (geoJSON) => {
    let centroids = kMeansClustering(geoJSON);
    scoreNeighborhoods(centroids);
}
//
function kMeansClustering(ptsJSON) {
  var options = {numberOfClusters: 5};
  var clustered = turf.clustersKmeans(ptsJSON, options);
  return getCentroids(clustered);
};

//
function getCentroids(cluster) {
    var centroids = {}
    cluster.features.forEach(function(element) {
        var centroidNumber = element.properties.cluster;
        if (!centroids[centroidNumber]) {
            centroids[centroidNumber] = {
                coords: element.properties.centroid, 
                count: 0
            };
        } else {
            var count = centroids[centroidNumber].count
            centroids[centroidNumber].count = count+1;
        }
    })
    return centroids;
};