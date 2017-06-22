var db = require( './dbservice.js').db;

var UserSchema = require('../models/IkeasocialSchema.js').UserSchema;
var User = db.model('users', UserSchema,'users');


exports.authenticate = function(req, res) {
	// Query Mongo for Employees, just get back the Employee Name
	User.find({userid:req.body.username,password:req.body.password}, function(error, users) {
        if(error) throw error;
		if(users.length){
		res.json({success: true});
		}else{
			res.json({success: false, message:"Invalid UserName or Password"});
		}
	});
};



// JSON API for creating a new employee
exports.create = function(req, res) {
User.find({userid:req.body.username}, {userid: 1}, function(error, users) {
	if(users.length){
		res.json({success: false, message:"User Id is already registerd!"});
		}
	});
	
			// Build up employee object to save
			userObj = {
				userid: req.body.username, 
				password: req.body.password,
				firstname:req.body.firstName,
				lastname:req.body.lastName
		};
				
	// Create employee model from built up employee object
	var userVar = new User(userObj);
	
	// Save employee to DB
	userVar.save(function(err, doc) {
		if(err || !doc) {
            console.log(err);
           	throw 'Error';

		} else {
			var r = doc.toJSON()
			r.success = true;
			res.json(r);
		}		
	});
};


exports.list = function(req, res) {
	// Query Mongo for Employees, just get back the Employee Name
	User.find({}, {userid: 1}, function(error, users) {
		res.json(users);
	});
};

exports.findByUserId = function(req, res) {
	// Employee ID comes in the URL
	var userid = req.params.userid;
	
	// Find the poll by its ID, use lean as we won't be changing it
	User.find({userid:req.params.userid}, function(error, UserItem) {
			if(UserItem.length){
			res.json(UserItem[0]);
		}else {
			res.json({noRecords: true});
			
			}
	});
};