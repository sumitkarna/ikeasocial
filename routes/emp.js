var db = require( '/dbservice.js').db;

var UserSchema = require('../models/IkeasocialSchema.js').UserSchema;
var User = db.model('users', UserSchema,'users');


exports.authenticate = function(req, res) {
	
	// Query Mongo for Employees, just get back the Employee Name
	User.find({userid:req.body.username,password:req.body.password}, function(error, users) {
        if(error) throw error;
		if(users.length){
		res.json({success: true});
		}else{
			res.json({success: false});
		}
	});
};



// JSON API for creating a new employee
exports.create = function(req, res) {

	
			// Build up employee object to save
			userObj = {
				userid: req.body.username, 
				password: req.body.password
		};
				
	// Create employee model from built up employee object
	var userVar = new User(userObj);
	
	// Save employee to DB
	userVar.save(function(err, doc) {
		if(err || !doc) {
            console.log(err);
           	throw 'Error';

		} else {
			res.json(doc);
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
	// Query Mongo for Employees, just get back the Employee Name
    
	User.find({userid:req.body.username}, {userid: 1}, function(error, users) {
		res.json(users);
	});
};