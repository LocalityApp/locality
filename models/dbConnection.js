
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const userName = process.env.MONGO_USER;
const pwd = process.env.MONGO_PWD;

const uri = `mongodb+srv://${userName}:${pwd}@cluster0-lmodr.mongodb.net/admin`;


const createUser = (UID, userData={}, cb) =>{
	// Should create some stuff
	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		const collection = client.db('master').collection('users');
		try{
			collection.insertOne(
				{'UID': UID,
				'userData': userData
				}
			);
			readUserData(UID, '', cb);
		}
		catch(e){
			throw e.message;
		}
		console.log(`User ${UID} created`);
		client.close();
	});
};

const readUserData = (UID, user, callback = null) => {
	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		const collection = client.db('master').collection('users');
		collection.find({'UID': UID}).toArray(function (err, result) {
			if (err) throw err;
			callback.render('home', {
				user: result[0]
			});
			console.log(result);
			if(result.length == 0){
				console.log('we should create a user');
				createUser(UID, user, callback);
			}
		});
		client.close();
	});
};

const updateUserData = (UID, userData) => {
	// Should update some stuff
	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		const collection = client.db('master').collection('users');
		try{
			collection.updateOne(
				{'UID': UID},
				{ $set: {'customSettings': userData}});
			client.close();
		}
		catch(e){
			throw e.message;
		}
	});
};

const deleteUser = (UID) => {
	// Destroy this user
	MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
		const collection = client.db('master').collection('users');
		try{
			collection.deleteOne({'UID' : UID});
		}
		catch (e){
			throw e.message;
		}
		console.log(`User ${UID} deleted`);
		client.close();
	});
};


module.exports = {
	'createUser': createUser,
	'readUserData': readUserData,
	'updateUserData': updateUserData,
	'deleteUser': deleteUser
};