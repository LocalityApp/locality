const express = require('express');
const router = express.Router();

// Auth0 
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');

// Loading dotenv file. 
require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
	throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

const corsOptions =  {
	origin: 'http://localhost:3000'
};

router.use(cors(corsOptions));

const checkJwt = jwt({
	// Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
	}),

	// Validate the audience and the issuer.
	audience: process.env.AUTH0_AUDIENCE,
	issuer: `https://${process.env.AUTH0_DOMAIN}/`,
	algorithms: ['RS256']
});

const checkScopes = jwtAuthz(['read:messages']);

router.get('/public', function(req, res) {
	res.json({
		// Update this with public search page when functioning.
		message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
	});
});

router.get('/private', checkJwt, function(req, res) {
	res.json({
		// Update this with private serach page when functioning.
		message: 'Hello from a private endpoint! You need to be authenticated to see this.'
	});
});

// Determine if this is needed.
router.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
	res.json({
		message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
	});
});

router.use(function(err, req, res){
	if(err){
		throw err.stack;
	}
	return res.status(err.status).json({ message: err.message });
});

module.exports = router;
