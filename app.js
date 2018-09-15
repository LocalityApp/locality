const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const flash = require('connect-flash');

dotenv.load();

// const routes (github) DELETE AFTER
const indexRouter = require('./routes/index');
// const user (github) DELETE AFTER
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');

// This will configure Passport to use Auth0
const strategy = new Auth0Strategy(
	{
		domain: process.env.AUTH0_DOMAIN,
		clientID: process.env.AUTH0_CLIENT_ID,
		clientSecret: process.env.AUTH0_CLIENT_SECRET,
		callbackURL:
			process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
	},
	function (accessToken, refreshToken, extraParams, profile, done) {
		// accessToken is the token to call Auth0 API (not needed in the most cases)
		// extraParams.id_token has the JSON Web Token
		// profile has all the information from the user
		return done(null, profile);
	}
);

passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

const app = express();
// Set Handlebars. 
const exphbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs(
	{defaultLayout: 'layout'}
));
// view engine setup
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(cookieParser());
// This allows us to save sessions - users/web tokens, etc.
app.use(
	session({
		secret: 'shhhhhhhhh',
		resave: true,
		saveUninitialized: true
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);


// Parse application/json
// app.use(bodyParser.json());

app.use(flash());

app.use(function (req, res, next) {
	if (req && req.query && req.query.error) {
		req.flash('error', req.query.error);
	}
	if (req && req.query && req.query.error_description) {
		req.flash('error_description', req.query.error_description);
	}
	next();
});

// Check logged in
app.use(function (req, res, next) {
	res.locals.loggedIn = false;
	if (req.session.passport && typeof req.session.passport.user != 'undefined') {
		res.locals.loggedIn = true;
	}
	next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
