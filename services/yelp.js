
//
const request = require('request-promise');
const createFeatureObj = require('./createFeatureObj');
require('dotenv').config();

//
var geoJSON = {
  'type': 'FeatureCollection', 
  'features': []
};

//
const amenities = 'arts|food|nightlife|restaurants';
// const services = 'automotive|bicycles|financialservices|health|homeservices|professional|shopping';
// const education = 'education';
// const transit = 'trainstations|busstations|airports';
// const safety = 'firedepartments|policedepartments';

//
const API_ENDPOINT = 'https://api.yelp.com/v3/businesses/search?limit=50&radius=22000&latitude=39.802518&longitude=-105.076211&categories='+amenities;

//
module.exports = go = async (cb) => {
  geoJSON.features = await getPoints();
  cb(geoJSON);
};

const getPoints = async () => {
  let records = [];
  let keepGoing = true;
  let offset = 0;
  while (keepGoing) {
    let response = await reqPoints(offset)
    await records.push.apply(records, response);
    offset += 50;
    if (offset >= 100) {
      keepGoing = false;
      return records;
    }
  }
};

const reqPoints = async(offset) => {
  const pointReq = {
    url: `${API_ENDPOINT}&offset=${offset}`, 
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