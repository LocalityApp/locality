const fs = require('fs');
const attractionsContent = fs.readFileSync('public/data/attractions.json');
const attractions = JSON.parse(attractionsContent);
const educationContent = fs.readFileSync('public/data/education.json');
const education = JSON.parse(educationContent);
const nightlifeContent = fs.readFileSync('public/data/nightlife.json');
const nightlife = JSON.parse(nightlifeContent);
const parksContent = fs.readFileSync('public/data/parks.json');
const parks = JSON.parse(parksContent);
const servicesContent = fs.readFileSync('public/data/services.json');
const services = JSON.parse(servicesContent);
const transitContent = fs.readFileSync('public/data/transit.json');
const transit = JSON.parse(transitContent);

const locations = {
    attractions: attractions,
    education: education,
    nightlife: nightlife,
    parks: parks,
    services: services,
    transit: transit
};

module.exports = locations;