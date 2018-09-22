
//
const request = require('request-promise');
const createFeatureObj = require('./createFeatureObj');
const fs = require('fs');
require('dotenv').config();

//
var geoJSON = {
  'type': 'FeatureCollection', 
  'features': []
};

//
// const amenities = 'arts|food|nightlife|restaurants';
// const services = 'automotive|bicycles|financialservices|health|homeservices|professional|shopping';
// const education = 'education';
// const transit = 'trainstations|busstations|airports';
// const safety = 'firedepartments|policedepartments';

//
const API_ENDPOINT = 'https://api.yelp.com/v3/businesses/search?limit=50&radius=22000&latitude=39.7392&longitude=-104.9903';

//
module.exports = go = async (context, cb) => {
  geoJSON.features = await getPoints(context);
  cb(geoJSON);
};

const getPoints = async (context) => {
  let fileName = './public/data/transit.json';
  let records = [];
  let keepGoing = true;
  let offset = 0;
  while (keepGoing) {
    fileWrite(fileName, '{ "dataPoints": [');
    let response = await reqPoints(context, offset);
    await records.push.apply(records, response);
    offset += 50;
    if (offset >= 1000) {
      keepGoing = false;
      records.forEach(element =>{
        fileWrite(fileName, JSON.stringify(element)+ ', \n');
      });
      console.log(records);
      return records;
    }
  }
};

const reqPoints = async(context, offset) => {
  const pointReq = {
    url: `${API_ENDPOINT}&categories=trainstations,busstations,airports,bikesharing,metrostations,publictransport,trains&offset=${offset}`, 
    json: true, 
    headers: {
      'User-Agent': 'request',
      'Authorization': `Bearer ${process.env.YELP_KEY}`
    }
  };
  let payload = await request(pointReq);
  var pointFeatures = [];
  payload.businesses.forEach(function(business) {
    pointFeatures.push(createFeatureObj(business));
  });
  return pointFeatures;
};
function fileWrite(fileName, text){
  fs.appendFileSync(fileName, text, 'utf8', function (err) {
    if (err) {
        console.log('An error occured while writing JSON Object to File.');
        return console.log(err);
    }
    console.log('Record has been written');
  });
}
