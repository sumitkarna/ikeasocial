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

// JSON API for list of polls
exports.list = function(req, res) {
	// Query Mongo for polls, just get back the question text
	Employee.find({}, 'fistname', function(error, employee) {
		res.json(employee);
	});
};

// JSON API for creating a new employee
exports.create = function(req, res) {

	var reqBody = req.body,
			// Build up employee object to save
			employeeeObj = {
				firstname: reqBody.firstname, 
				lastname:reqBody.lastname,
				emailaddr:reqBody.emailaddr,
				team:reqBody.team,
				nickname:reqBody.nickname,
				officephone:reqBody.officephone,
				homephone:reqBody.homephone,
				photos:reqBody.photos,
				hobbies:reqBody.hobbies,
				aboutme: reqBody.aboutme,
				maritialstatus:reqBody.maritialstatus,
				anniversay:reqBody.anniversay,
				birthday:reqBody.birthday,
				facebook: reqBody.facebook,
				linkedin: reqBody.linkedin,
				twitter:  reqBody.twitter

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

