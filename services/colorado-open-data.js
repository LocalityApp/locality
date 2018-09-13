const request = require('request');
const dotenv = require('dotenv'); 

dotenv.load();

const searchRestaurants = (lat='', lng='', type='') => {
    const options = {
        url: 'https://api.yelp.com/v3/businesses/search?term='+type+'&latitiude='+lat+'&longitude='+lng,
        headers: {
          'User-Agent': 'request',
          'Authorization': `Bearer ${process.env.YELP_KEY}`
        }
      };
    
      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          console.log(info);
        }
      }

      request(options, callback);
};

const generalSearch = str => {
    const options = {
        url: 'https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco?',
        headers: {
          'User-Agent': 'request',
          'Authorization': `Bearer ${process.env.YELP_KEY}`
        }
      };
    
      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          console.log(info);
        }
      }

      request(options, callback);
    
};


searchRestaurants('39.802518', '-105.076211', 'delis');
// generalSearch(' ');
module.exports = {
    searchRestaurants:searchRestaurants
};