
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
// const nightlife = 'barcrawl|restaurants|bars|beergardens|coffeeshops|comedyclubs|danceclubs|karaoke|pianobars|poolhalls|musicvenues|beer_and_wine|breweries|coffee|cannabisdispensaries';
// const services = 'autorepair|servicestations|bikeshop|banks|insurance|health|homeservices|vet|accountants|postoffices';
// const attractions = 'waterparks|zoos|amateursportsteams|amusementparks|aquariums|beaches|arcades|galleries|movietheaters|museums|theater|libraries';
// const education = 'collegeuniv|elementaryschools|highschools|preschools|privateschools';
// const transit = 'trainstations|busstations|airports|bikesharing|metrostations|publictransport|trains';
// const parks = 'parks|lakes|baseballfields|basketballcourts|dog_parks|skate_parks|playgrounds|publicplazas|swimmingpools|tennis|';

//
const API_ENDPOINT = 'https://api.yelp.com/v3/businesses/search?limit=50&radius=22000&latitude=39.7392&longitude=-104.9903';

//
module.exports = go = async (context, cb) => {
  geoJSON.features = await getPoints(context);
  cb(geoJSON);
};

const getPoints = async (context) => {
  let records = [];
  let keepGoing = true;
  let offset = 0;
  while (keepGoing) {
    let response = await reqPoints(context, offset);
    await records.push.apply(records, response);
    offset += 50;
    if (offset >= 100) {
      keepGoing = false;
      return records;
    }
  }
};

const reqPoints = async(context, offset) => {
  const pointReq = {
    url: `${API_ENDPOINT}&categories=${context}&offset=${offset}`, 
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