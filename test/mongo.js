var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../models/dbConnection');
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

