
var mongoose = require('mongoose');
var db;
var cfenv = require('cfenv');
var appenv = cfenv.getAppEnv();
var MongoClient = require("mongodb").MongoClient;
var services = appEnv.services;

if (process.env.VCAP_SERVICES) { 

var mongodb_services = services["compose-for-mongodb"];

var credentials = mongodb_services[0].credentials;

var ca = [new Buffer(credentials.ca_certificate_base64, 'base64')];

MongoClient.connect(credentials.uri, {
        mongos: {
            ssl: true,
            sslValidate: true,
            sslCA: ca,
            poolSize: 1,
            reconnectTries: 1
        }
    },
    function(err, db) {
        if (err) {
            console.log(err);
        } else {
            db = db.db("events");
        }
    }
);
} else {
   db = mongoose.createConnection('localhost', 'ikeasocialapp');
}

exports.db = db;