// Connect to MongoDB using Mongoose
var mongoose = require('mongoose');
var db;
if (process.env.VCAP_SERVICES) {
   var env = JSON.parse(process.env.VCAP_SERVICES);
   db = mongoose.createConnection(env['mongodb-2.2'][0].credentials.url);
} else {
   db = mongoose.createConnection('localhost', 'ikeasocialapp');
}

// Get Employee schema and model
var EmployeeSchema = require('../models/IkeasocialSchema.js').EmployeeSchema;
var Employee = db.model('Employee', EmployeeSchema);

// Main application view
exports.index = function(req, res) {
	res.render('index');
};

// JSON API for list of employee

exports.list = function(req, res) {
	// Query Mongo for polls, just get back the question text
	Employee.find({}, 'emailaddr', function(error, employee) {
		res.json(employee);
	});
};

// JSON API for creating a new employee
exports.create = function(req, res) {

	var reqBody = req.body,
			// Build up employee object to save
			employeeeObj = {
				name: reqBody.name, 
				role:reqBody.role,
				basedin:reqBody.basedin,
				emailaddr:reqBody.emailaddr,
				team:reqBody.team,
				phone:reqBody.phone,
				//need chage to incorporate pics
				profilephoto:reqBody.profilephoto,
				aboutme:reqBody.aboutme,
				biggestmistake:reqBody.biggestmistake,
				successtory:reqBody.successtory,
				funfact: reqBody.funfact,
				notoverlook:reqBody.notoverlook,
				yearswithibm:reqBody.yearswithibm,
				yearswithikea:reqBody.yearswithikea,
				linkedinlink: reqBody.linkedinlink,
				twitterlink: reqBody.twitterlink,
				instagramlink:  reqBody.instagramlink
		};
				
	// Create employee model from built up poll object
	var employeee = new Employee(employeeeObj);
	
	// Save poll to DB
	employeee.save(function(err, doc) {
		if(err || !doc) {
			throw 'Error';
		} else {
			res.json(doc);
		}		
	});
};

