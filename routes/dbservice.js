
var mongoose = require('mongoose');
var db;
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

var services = appEnv.services;

if (process.env.VCAP_SERVICES) { 

var mongoDbUrl, mongoDbOptions = {};
var mongodb_services = services["compose-for-mongodb"];

var credentials = mongodb_services[0].credentials;

var ca = [new Buffer(credentials.ca_certificate_base64, 'base64')];
mongoDbUrl = credentials.uri;
mongoDbOptions = {
  mongos: {
    ssl: true,
    sslValidate: true,
    sslCA: ca,
    poolSize: 1,
    reconnectTries: 1
  }
};
console.log("Connecting to", mongoDbUrl);
db= mongoose.connect(mongoDbUrl, mongoDbOptions);
} else {
   db = mongoose.createConnection('localhost', 'ikeasocialapp');
}

exports.db = db;
