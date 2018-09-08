
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const userName = process.env.MONGO_USER;
const pwd = process.env.MONGO_PWD;

const uri = `mongodb+srv://${userName}:${pwd}@cluster0-lmodr.mongodb.net/admin`;

const createUser = (emailAddress, userData) =>{
	// Should create some stuff
	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		const collection = client.db('master').collection('users');
		collection.find({'email': emailAddress}).toArray(function (err, result) {
			if (err) throw err;
		
			console.log(result);
			if(result.length == 0 && userData){
				console.log('we should create a user');
			}
		});
		client.close();
	});
};

const readUserData = (emailAddress, callback) => {
	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		const collection = client.db('master').collection('users');
		collection.find({'email': emailAddress}).toArray(function (err, result) {
			if (err) throw err;
		
			console.log(result);
			if(result.length == 0 && callback){
				console.log('we should create a user');
			}
		});
		client.close();
	});
};

const updateUserData = (emailAddress, userData) => {
	// Should update some stuff
	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		const collection = client.db('master').collection('users');
		collection.find({'email': emailAddress}).toArray(function (err, result) {
			if (err) throw err;
		
			console.log(result);
			if(result.length == 0 && userData){
				console.log('we should create a user');
			}
			
		});
		client.close();
	});
};

const deleteUser = (emailAddress, userData) => {
	// Destroy this user
	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		const collection = client.db('master').collection('users');
		collection.find({'email': emailAddress}).toArray(function (err, result) {
			if (err) throw err;
		
			console.log(result);
			if(result.length == 0 && userData){
				console.log('we should create a user');
			}
			
		});
		client.close();
	});
};



readUserData('smanele@hotmail.com');

module.exports = {
	'createUser': createUser,
	'readUserData': readUserData,
	'updateUserData': updateUserData,
	'deleteUser': deleteUser
};