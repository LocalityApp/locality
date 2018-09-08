const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Parse application? Do we need this? 
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

// Set Handlebars. 
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'layout'}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});


// Auth0 Authentication and Event Handler - How to set up with handlebars
// $('document').ready(function() {

//   let webAuth = new auth0.WebAuth({
//     domain: process.env.AUTH0_DOMAIN,
//     clientID: process.env.AUTH0_CLIENT_ID,
//     // Will need to update this in process.env file when we have actual callback URL. Set to localhost for now.
//     redirectUri: process.env.AUTH0_CALLBACK_URL,
//     audience: 'https://' + process.env.AUTH0_DOMAIN + '/userinfo',
//     responseType: 'token id_token',
//     scope: 'openid'
//   });

//   let loginBtn = $('#btn-login');

//   loginBtn.click(function(event) {
//     event.preventDefault();
//     webAuth.authorize();
//   });

// });

module.exports = app;
