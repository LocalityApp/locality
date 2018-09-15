

const yelp = require('./yelp.js');
const kmeans = require('./kmeans.js');
const nightlife = 'barcrawl,restaurants,bars,beergardens,coffeeshops,comedyclubs,danceclubs,karaoke,pianobars,poolhalls,musicvenues,beer_and_wine,breweries,coffee,cannabisdispensaries';
const services = 'autorepair,servicestations,bikeshop,banks,insurance,health,homeservices,vet,accountants,postoffices';
const parks = 'parks,lakes,baseballfields,basketballcourts,dog_parks,skate_parks,playgrounds,publicplazas,swimmingpools,tennis';
var yelpService = {
    'contexts': [
        {
            'context': parks,
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
   };
   
// return cluster points as property of context centroids
yelpService.contexts.forEach(function(context) {
    context.centroids = yelp(context, kmeans);
    // formerly context
});

