/*jshint node:true*/
var express = require('express');
var routes = require('./routes/index.js');
var http = require('http');
var path = require('path');
var userRoute = require('./routes/emp.js');

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
app.post('/api/employees', routes.create);
app.get('/employees/employees', routes.list);
app.get('/api/employees/:id', routes.employee);
app.post('/api/authenticate', userRoute.authenticate);
app.get('/api/authenticate', userRoute.authenticate);
app.post('/api/users',userRoute.create);
app.get('/api/users/:userid',userRoute.create);
app.get('/api/users',userRoute.create);
app.get('/api/employeDetails/:id',routes.employeeDetail);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

