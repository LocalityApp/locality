
//
module.exports = function createFeatureObj(busObj) {
  var pt = {
    'type': 'Feature', 
    'geometry': {
      'type': 'Point', 
      'coordinates': [+busObj.coordinates.longitude, +busObj.coordinates.latitude]
    },
    'properties': {
      'name': busObj.name
    }
  };
  return pt;
};