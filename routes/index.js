const express = require('express');
const passport = require('passport');
const Vue = require('vue');
var slicksort = require('vue-slicksort');
var ContainerMixin = slicksort.ContainerMixin;
var ElementMixin = slicksort.ElementMixin;
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();
// Loading dotenv file. 
require('dotenv').config();
/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', { title: 'Locality: Find You Neighborhood' });
});

router.get('/login', passport.authenticate('auth0', {
	scope: 'openid email profile'
}), function (req, res) {
	res.redirect('/');
});

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/callback',
	passport.authenticate('auth0', {
		failureRedirect: '/failure'
	}),
	function (req, res) {
		req.user.randomField = 'Some SHit';
		res.redirect(req.session.returnTo || '/users');
	}
);

router.get('/failure', function (req, res) {
	var error = req.flash('error');
	var error_description = req.flash('error_description');
	req.logout();
	res.render('failure', {
		error: error[0],
		error_description: error_description[0],
	});
});

router.get('/user', ensureLoggedIn, function (req, res) {
	res.render('user', {
		user: req.user,
		userProfile: JSON.stringify(req.user, null, '  ')
	});
});

const SortableList = {
	mixins: [ContainerMixin],
	template: `
	  <ul class="list">
		<slot />
	  </ul>
	`,
  };
  
  const SortableItem = {
	mixins: [ElementMixin],
	props: ['item'],
	template: `
	  <li class="list-item">{{item}}</li>
	`,
  };
  
  const ExampleVue = {
	name: 'Example',
	template: `
	  <div class="root">
		<SortableList lockAxis="y" v-model="items">
		  <SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item"/>
		</SortableList>
	  </div>
	`,
	components: {
		SortableItem,
		SortableList,
	},
	data() {
		return {
			items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'],
	};
	},
  };
  
const vueComponent = new Vue({
	el: '#root',
	render: (h) => h(ExampleVue),
});


var app3 = new Vue({
	el: '#app-3',
	data: {
		seen: true
	}
});

router.get('/vue', (req,res) =>{
	res.render('vueTest', {vue: vueComponent});
});
module.exports = router;
