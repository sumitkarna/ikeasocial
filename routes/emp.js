var mongoose = require('mongoose');
var db = require( './dbservice.js').db;
var nev = require('email-verification')(mongoose);

var UserSchema = require('../models/IkeasocialSchema.js').UserSchema;
var User = db.model('users', UserSchema,'users');
var TempSchema = require('../models/tempSchema.js').TempUserSchema;
var TempUser = db.model('tempUsers',TempSchema,'tempUsers');
nev.configure({
    verificationURL: 'http://localhost:8080/email-verification/${URL}',
	tempUserModel: TempUser,
    persistentUserModel: User,
    tempUserCollection: 'tempusers',
	emailFieldName: 'userid',
    passwordFieldName: 'password',
 
    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'ikeasocialapp@gmail.com',
            pass: 'ikeasocialapp1'
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <myawesomeemail_do_not_reply@gmail.com>',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    }
}, function(error, options){
});



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
		userid=req.body.username;
			// Build up employee object to save
			userObj = {
				userid: req.body.username, 
				password: req.body.password,
				firstname:req.body.firstName,
				lastname:req.body.lastName
		};
				
	// Create employee model from built up employee object
	var userVar = new User(userObj);


	nev.createTempUser(userVar, function(err, existingPersistentUser, newTempUser) {
    // some sort of error 
    if (err){
		console.log(err);
	}
	
        // handle error... 
 
    // user already exists in persistent collection... 
    if (existingPersistentUser){
		console.log("existing user");
		res.json({message:"User Already Exists, login to view ur profile"});
		
			
	}
        // handle user's existence... violently. 
 
    // a new user 
    else if (newTempUser) {
        var URL = newTempUser[nev.options.URLFieldName];
        nev.sendVerificationEmail(userid, URL, function(err, info) {
            if (err){
				console.log(err);
				           				}
                // handle error... 
 
            // flash message of success 
			res.json({success:true});
        });
 
    // user already exists in temporary collection... 
    } else {
        console.log("User Exists in temporary collection");
		res.json({message:"User Already Exists in temporary collection"});
    }
});
	
	
};

exports.permanentCreate = function(req,res){
	var url =req.params.url;
	if(url){
	nev.confirmTempUser(url, function(err, user) {
    if (err)
       console.log("Unable to move the user to perm table");
 
    // user was found! 
    if (user) {
        // optional 
        nev.sendConfirmationEmail(user['userid'], function(err, info) {
            // redirect to their profile... 
			req.flash('info','Login with Cred');
			res.redirect("/#/login");
        });
    }
 
    // user's data probably expired... 
    else{
	req.flash('info','Expired re register');
			res.redirect("/#/register");
	}
        // redirect to sign-up 
});
		

	}
}

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