var mongoose = require('mongoose');

// Document schema for employee
exports.EmployeeSchema = new mongoose.Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	emailaddr: { type: String, required: true },
	team: { type: String, required: true },
	nickname:  String,
	officephone: String,
	homephone:String,
	//photos:   String,
	hobbies:  String,
	aboutme:  String,
	maritialstatus:String,
	anniversay:Date,
	birthday:Date,
	facebook: String,
	linkedin: String,
	twitter:  String
});