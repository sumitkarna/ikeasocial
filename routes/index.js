var db = require( './dbservice.js').db;


// Get Employee schema and model
var EmployeeSchema = require('../models/IkeasocialSchema.js').EmployeeSchema;
var Employee = db.model('employees', EmployeeSchema);

// Get Employee schema and model
var PhotoSchema = require('../models/IkeasocialSchema.js').PhotoSchema;
var Photo = db.model('Photos', PhotoSchema);

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
	var userid = req.params.id;
	
	// Find the poll by its ID, use lean as we won't be changing it
	Employee.find({emailaddr:req.params.id}, function(error, employeeItem) {
			if(employeeItem.length){
			res.json({noRecords: false});
		}else {
			res.json({noRecords: true});
			
			}
	});
};
// JSON API for getting a single Employee Detail
exports.employeeDetail = function(req, res) {
	
	// Employee ID comes in the URL
	var userid = req.params.id;
	
	// Find the poll by its ID, use lean as we won't be changing it
	Employee.find({emailaddr:req.params.id}, function(error, employeeItem) {
			if(employeeItem.length){
			res.json(employeeItem[0]);
		}else {
			res.json({noRecords: true});
			
			}
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

		/*photobj={
			emailaddr:reqBody.emailaddr,
			profilephoto:reqBody.profilephoto
		}*/
				
	// Create employee model from built up employee object
	var employeee = new Employee(employeeeObj);
	
	// Save employee to DB
	employeee.save(function(err, doc) {
		if(err || !doc) {
			throw err;
		} else {
			var r = doc.toJSON()
			r.success = true;
			res.json(r);
		}		
	});
	
	//var photo=new Photo(photobj)
	

	// Save photo to DB
	/*photo.save(function(err, doc) {
		if(err || !doc) {
			throw 'Error';
		} else {
			res.json(doc);
		}		
	});*/
};
