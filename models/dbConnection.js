
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const userName = process.env.MONGO_USER;
const pwd = process.env.MONGO_PWD;

const uri = `mongodb+srv://${userName}:${pwd}@cluster0-lmodr.mongodb.net/admin`;

const createUser = (emailAddress, userData={}) =>{
	// Should create some stuff
	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		const collection = client.db('master').collection('users');
		try{
			collection.insertOne(
				{'email': emailAddress,
				'userData': userData
				}
			);
		}
		catch(e){
			throw e.message;
		}
		console.log(`User ${emailAddress} created`);
		client.close();
	});
};

const readUserData = (emailAddress, userData = {}) => {
	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		const collection = client.db('master').collection('users');
		collection.find({'email': emailAddress}).toArray(function (err, result) {
			if (err) throw err;
		
			console.log(result);
			if(result.length == 0){
				console.log('we should create a user');
				createUser(emailAddress, userData);
			}
		});
		client.close();
	});
};

const updateUserData = (emailAddress, userData) => {
	// Should update some stuff
	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		const collection = client.db('master').collection('users');
		collection.updateOne(
			{'email': emailAddress},
			{'userData': userData}).toArray(function (err, result) {
			if (err) throw err;
			console.log(result);
		});
		client.close();
	});
};

const deleteUser = (emailAddress) => {
	// Destroy this user
	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		const collection = client.db('master').collection('users');
		try{
			collection.deleteOne({'email' : emailAddress});
		}
		catch (e){
			throw e.message;
		}
		console.log(`User ${emailAddress} deleted`);
		client.close();
	});
};


// createUser('smankele@hotmail.com');
// readUserData('smankele@hotmail.com');
// readUserData('smanele@hotmail.com');
// updateUser('smankele@hotmail.com');
// deleteUser('smankele@hotmail.com');

module.exports = {
	'createUser': createUser,
	'readUserData': readUserData,
	'updateUserData': updateUserData,
	'deleteUser': deleteUser
};