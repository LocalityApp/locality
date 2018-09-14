
//
const yelp = require('./yelp.js');
const kmeans = require('./kmeans.js');
const request = require('request-promise');

var contexts = {
    nightlife: 'barcrawl,restaurants,bars,beergardens,coffeeshops,comedyclubs,danceclubs,karaoke,pianobars,poolhalls,musicvenues,beer_and_wine,breweries,coffee,cannabisdispensaries', 
    services: 'autorepair,servicestations,bikeshop,banks,insurance,health,homeservices,vet,accountants,postoffices', 
    attractions: 'waterparks,zoos,amateursportsteams,amusementparks,aquariums,beaches,arcades,galleries,movietheaters,museums,theater,libraries', 
    education: 'collegeuniv,elementaryschools,highschools,preschools,privateschools', 
    transit: 'trainstations,busstations,airports,bikesharing,metrostations,publictransport,trains', 
    parks: 'parks,lakes,baseballfields,basketballcourts,dog_parks,skate_parks,playgrounds,publicplazas,swimmingpools,tennis'
}
   
// return cluster points as property of context centroids
module.exports = function(context) {
    var contextCategories = {
        "context": context, 
        "categories": contexts[context]
    }
    yelp(contextCategories, kmeans);
};

