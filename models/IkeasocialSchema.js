var mongoose = require('mongoose');

// Document schema for employee
exports.EmployeeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	role: { type: String, required: true },
	basedin:{type:String,required:true},
	emailaddr: { type: String, required: true },
	team: { type: String, required: true },
	phone: String,
	aboutme:String,
	biggestmistake:String,
	successtory:String,
	funfact:String,
	watchoutfor:String,
	notoverlook:String,
	joinmonthibm:String,
	joinyearibm:String,
	joinmonthikea:String,
	joinyearikea:String,
	birthday:String,
	birthmonth:String,
	anniversaryday:String,
	anniversarymonth:String,
	facebooklink:String,
	linkedinlink:String,
	twitterlink:String,
	instagramlink:String
});

exports.UserSchema = new mongoose.Schema({
	userid: { type: String, required: true },
	password:{ type: String, required: true },
	firstname:{ type: String, required: true },
	lastname:{ type: String, required: true }
});

exports.PhotoSchema = new mongoose.Schema({
	emailaddr: { type: String, required: true },
	img: { data: Buffer, contentType: String }
});




