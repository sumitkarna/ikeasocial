/*jshint node:true*/
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.set('port', process.env.VCAP_APP_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Handle Errors gracefully
app.use(function(err, req, res, next) {
	if(!err) return next();
	console.log(err.stack);
	res.json({error: true});
});

// Main App Page
app.get('/', routes.index);

// MongoDB API Routes
app.get('/employee', routes.list);
//app.get('/polls/:id', routes.poll);
app.post('/employee', routes.create);

//app.post('/vote', routes.vote);

//io.sockets.on('connection', routes.vote);

<<<<<<< Upstream, based on f5cb283e0b207ada6b29e9fe0f59760973117597
var mongodb_services = services["compose-for-mongodb"];

var credentials = mongodb_services[0].credentials;

var ca = [new Buffer(credentials.ca_certificate_base64, 'base64')];

var mongodb;

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
            mongodb = db.db("events");
        }
    }
);

// Add words to the database
app.put("/users", function(request, response) {
  mongodb.collection("users").insertOne( {
    userId: request.body.userId}, function(error, result) {
      if (error) {
        response.status(500).send(error);
      } else {
      	console.log("I am here");
        response.send(result);
      }
    });
});

// Then we create a route to handle our example database call
app.get("/users", function(request, response) {
  // and we call on the connection to return us all the documents in the
  // words collection.
  mongodb.collection("users").find().toArray(function(err, words) {
    if (err) {
     response.status(500).send(err);
    } else {
    	console.log("sent");
     response.send(words);
    }
  });
});


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
=======
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
>>>>>>> dc43de3 updated code
});
