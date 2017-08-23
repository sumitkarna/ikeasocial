var mongoose = require('mongoose');
var expirationTime= 86400;
 var tempUserSchemaObject = {
	 userid: { type: String, required: true },
	password:{ type: String, required: true },
	firstname:{ type: String, required: true },
	lastname:{ type: String, required: true },
	GENERATED_VERIFYING_URL:{ type: String, required:false }
 }
 
 // create a TTL
    tempUserSchemaObject.createdAt = {
      type: Date,
      expires: expirationTime.toString() + 's',
      default: Date.now
    };


exports.TempUserSchema = new mongoose.Schema(tempUserSchemaObject);



