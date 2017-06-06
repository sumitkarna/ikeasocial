// Connect to MongoDB using Mongoose
var db = require( 'dbservice').db;


// Get Employee schema and model
var EmployeeSchema = require('../models/IkeasocialSchema.js').EmployeeSchema;
var Employee = db.model('employees', EmployeeSchema);


// Main application view
exports.index = function(req, res) {
	res.render('index');
};

// JSON API for list of employee

exports.list = function(req, res) {
	// Query Mongo for Employees, just get back the Employee Name
	Employee.find({}, 'name', function(error, employees) {
		res.json(employees);
	});
};

// JSON API for getting a single Employee Detail
exports.employee = function(req, res) {
	
	// Employee ID comes in the URL
	var employeeId = req.params.id;
	
	// Find the poll by its ID, use lean as we won't be changing it
	Employee.findById(employeeId, '', { lean: true }, function(err, employee) {
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
				
	// Create employee model from built up employee object
	var employeee = new Employee(employeeeObj);
	
	// Save employee to DB
	employeee.save(function(err, doc) {
		if(err || !doc) {
			throw 'Error';
		} else {
			res.json(doc);
		}		
	});
};

