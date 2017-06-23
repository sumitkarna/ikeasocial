
var mongoose = require('mongoose');
var db;
var cfenv = require('cfenv');
var appenv = cfenv.getAppEnv();

if (process.env.VCAP_SERVICES) {

var services = appenv.services;

var mongodb_services = services["compose-for-mongodb"];

var mongoDbCredentials = mongodb_services[0].credentials;

var mongoDbUrl, mongoDbOptions = {};

var ca = [new Buffer(mongoDbCredentials.ca_certificate_base64, 'base64')];
mongoDbUrl = mongoDbCredentials.uri;
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
   // db = mongoose.createConnection('localhost', 'ikeasocialapp');
  db = mongoose.connect('mongodb://sumit:Passw0rd@ds129610.mlab.com:29610/ikeasocial');
}

exports.db = db;
