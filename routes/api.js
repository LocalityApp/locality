const express = require('express');
const request = require('request');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const db = require('../models/dbConnection');
const geo = require('../controllers/locations');
const router = express.Router();
const superSearch = require('../controllers/superSearch.js');
const cluster = require('../services/cluster');

router.get('/memberSearch', ensureLoggedIn, (req, res, status) => {
  // You may have noticed that we included two new require files, one of them being request. Request allows us to easily make HTTP requests. In our instance here, we are using the Huffington Post's API to pull the latest election results, and then we're sending that data to our polls view.
  // The second require was the connect-ensure-loggedin library, and from here we just required a method called ensureLoggedIn, which will check and see if the current user is logged in before rendering the page. If they are not, they will be redirected to the login page. We are doing this in a middleware pattern, we first call the ensureLoggedIn method, wait for the result of that action, and finally execute our /polls controller.
  request('https://api.yelp.com/v3/businesses/search?latitude=39.723244&longitude=-104.971963', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const polls = JSON.parse(body);
      // For this view, we are not only sending our environmental information, but the polls and user information as well.
      // Env removed env: env
      res.status(response.statusCode).json({ pollData: polls, user: req.user });
    } else {
      res.render('error');
    }
  });
});


router.get('/search', (req, res, status) => {
  // You may have noticed that we included two new require files, one of them being request. Request allows us to easily make HTTP requests. In our instance here, we are using the Huffington Post's API to pull the latest election results, and then we're sending that data to our polls view.
  // The second require was the connect-ensure-loggedin library, and from here we just required a method called ensureLoggedIn, which will check and see if the current user is logged in before rendering the page. If they are not, they will be redirected to the login page. We are doing this in a middleware pattern, we first call the ensureLoggedIn method, wait for the result of that action, and finally execute our /polls controller.
  request('https://api.yelp.com/v3/businesses/search?latitude=39.723244&longitude=-104.971963', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.json(body);
    } else {
      res.render('error');
    }
  });
});

router.post('/ftw', (req, res, status) => {
  
  console.log(geo.nightlife);
  res.json(geo.nightlife);
});


router.post('/userSettings', (req, res, status) => {
  // You may have noticed that we included two new require files, one of them being request. Request allows us to easily make HTTP requests. In our instance here, we are using the Huffington Post's API to pull the latest election results, and then we're sending that data to our polls view.
  // The second require was the connect-ensure-loggedin library, and from here we just required a method called ensureLoggedIn, which will check and see if the current user is logged in before rendering the page. If they are not, they will be redirected to the login page. We are doing this in a middleware pattern, we first call the ensureLoggedIn method, wait for the result of that action, and finally execute our /polls controller.
  if (req.body) {
    let userData = {
      nickname: req.body.nickname,
      workAddress: req.body.workAddress,
      homeAddress: req.body.homeAddress
    };
    db.updateUserData(req.body.UID, userData);
    res.json(userData);
  }
  else {
    res.json({ message: 'error' });
  }
});

router.post('/scores', (req, res, status) => {
  try {
    userCriteria = req.body;
    cluster(userCriteria);
    res.json({'score': 'We are calculating a score...'});
  } catch (error) {
    res.json({'message': 'Sorry we had a problem with calculating your score.  We have logged this request and will forward it to our QA team'});
  }
  
});

module.exports = router;