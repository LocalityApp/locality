
//
const yelp = require('./yelp.js');
const kmeans = require('./kmeans.js');

//
var yelpService = {
    'contexts': [
        {
            'context': 'amenities',
            'categories': 'arts|food|nightlife|restaurants',
            geoJSON: {

            },
            centroids: {}
        }, 
        // {'services': 'automotive|bicycles|financialservices|health|homeservices|professional|shopping'}, 
        // {'education': 'education'}, 
        // {'transit': 'trainstations|busstations|airports'}, 
        // {'safety': 'firedepartments|policedepartments'}
    ]
   }
   
// return cluster points as property of context centroids
yelpService.contexts.forEach(function(context) {
    context.centroids = yelp(context, kmeans)
});

