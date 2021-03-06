var db = require( './dbservice.js').db;
var fs = require('fs');


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
	Employee.find({}, 'name emailaddr', function(error, employees) {
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

// JSON API for Updating a new employee
exports.update = function(req, res) {

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
				watchoutfor:reqBody.watchoutfor,
				joinmonthibm:reqBody.joinmonthibm,
				joinyearibm:reqBody.joinyearibm,
				joinmonthikea:reqBody.joinmonthikea,
				joinyearikea:reqBody.joinyearikea,
				birthday:reqBody.birthday,
				birthmonth:reqBody.birthmonth,
				anniversarymonth:reqBody.anniversarymonth,
				anniversaryday:reqBody.anniversaryday,
				facebooklink: reqBody.facebooklink,
				twitterlink: reqBody.twitterlink,
				linkedinlink: reqBody.linkedinlink,
				instagramlink:  reqBody.instagramlink
		};

		
	// Update employee model from built up employee object
	var employeee = new Employee(employeeeObj);
	// Save employee to DB
	var query = { emailaddr: reqBody.emailaddr };
	console.log(query);
	Employee.findOneAndUpdate(query, employeeeObj, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }else {
			var r = doc.toJSON()
			r.success = true;
			res.json(r);
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
				watchoutfor:reqBody.watchoutfor,
				joinmonthibm:reqBody.joinmonthibm,
				joinyearibm:reqBody.joinyearibm,
				joinmonthikea:reqBody.joinmonthikea,
				joinyearikea:reqBody.joinyearikea,
				birthday:reqBody.birthday,
				birthmonth:reqBody.birthmonth,
				anniversarymonth:reqBody.anniversarymonth,
				anniversaryday:reqBody.anniversaryday,
				facebooklink: reqBody.facebooklink,
				twitterlink: reqBody.twitterlink,
				linkedinlink: reqBody.linkedinlink,
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
	
	
};

exports.photoSave = function(req, res) {
		console.log(req.file);
	
	 var photo = new Photo;
photo.img.data = fs.readFileSync(req.file.path);
photo.img.contentType = req.file.mimetype;
photo.emailaddr=req.file.originalname;
  photo.save(function (err, a) {
if (err) throw err;
	});
			res.end('File is uploaded')
};

exports.photoUpdate = function(req, res) {
		console.log(req.file);
	
	 var photo = new Photo;
photo.img.data = fs.readFileSync(req.file.path);
photo.img.contentType = req.file.mimetype;
photo.emailaddr=req.file.originalname;
var query = { emailaddr: req.file.originalname };
	console.log(query);

Photo.findOneAndUpdate(query, { "$set" : { "img.data": fs.readFileSync(req.file.path), "img.contentType" : req.file.mimetype } }, {new: true, upsert : true }, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }else {	
			
			res.json({success: true});
		}	

	});
 
			
};
exports.viewPhoto = function(req, res) {
	
	// Employee ID comes in the URL
	var userid = req.params.id;
	
	// Find the poll by its ID, use lean as we won't be changing it
	Photo.find({emailaddr:req.params.id}, function(error, photItem) {
			if(photItem.length){
			res.json(photItem[0]);
		}else {
			res.json({noRecords: true});
			
			}
	});
};