
//
module.exports = function createFeatureObj(busObj) {
  var pt = {
    "type": "Feature", 
    "geometry": {
      "type": "Point", 
      "coordinates": [busObj.coordinates.latitude, busObj.coordinates.longitude]
    },
    "properties": {
      "name": busObj.name
    }
  }
  return pt;
};