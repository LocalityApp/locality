const fs = require('fs');
const content  = fs.readFileSync(__dirname + '/ZillowNeighborhoodsCO.json');
const neighborhoods = JSON.parse(content);

console.log(neighborhoods.features[300]);
//nightlife
// neighborhoods.features[251];
// { type: 'Feature',
//   geometry: { type: 'Polygon', coordinates: [ [Array] ] },
//   properties: 
//    { State: 'CO',
//      County: 'Denver',
//      City: 'Denver',
//      Name: 'Central Business District',
//      RegionID: '268632' } }

// attractions
// neighborhoods.features[252];
// { type: 'Feature',
//   geometry: { type: 'Polygon', coordinates: [ [Array] ] },
//   properties: 
//    { State: 'CO',
//      County: 'Denver',
//      City: 'Denver',
//      Name: 'City Park West',
//      RegionID: '268637' } }

// 260
// { type: 'Feature',
//   geometry: { type: 'Polygon', coordinates: [ [Array] ] },
//   properties: 
//    { State: 'CO',
//      County: 'Denver',
//      City: 'Denver',
//      Name: 'Globeville',
//      RegionID: '268664' } }

// 271
// { type: 'Feature',
//   geometry: { type: 'Polygon', coordinates: [ [Array] ] },
//   properties: 
//    { State: 'CO',
//      County: 'Boulder',
//      City: 'Boulder',
//      Name: 'Sale Lake',
//      RegionID: '416123' } }

// 202 - parks
// { type: 'Feature',
//   geometry: { type: 'Polygon', coordinates: [ [Array] ] },
//   properties: 
//    { State: 'CO',
//      County: 'Denver',
//      City: 'Denver',
//      Name: 'Cherry Creek',
//      RegionID: '268635' } }