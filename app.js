/*jshint node:true*/
var express = require('express');
var routes = require('./routes/index.js');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var userRoute = require('./routes/emp.js');
var multer  = require('multer');
var methodOverride = require('method-override');
var mime = require('mime');




var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname+'/uploads');
  },
  filename: function (req, file, callback) {
	
    callback(null, file.originalname + '-' + Date.now()+ '.' + mime.extension(file.mimetype));
	
  }
});



//var upload = multer({ dest:'./uploads' }, {onFileUploadData: function (file, data) {
  //console.log(data.length + ' of ' + file.fieldname + ' arrived')
//}});
var upload = multer({ storage: storage });


var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.set('port', process.env.VCAP_APP_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
	limit: '50mb',
  extended: true
}));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser('keyboard cat'));
 app.use(express.session({ cookie: { maxAge: 60000 }}));
  //app.use(flash());
//app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use(methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/fileUpload', express.static(__dirname + '/node_modules/ng-file-upload/dist/'));

// Handle Errors gracefully
app.use(function(err, req, res, next) {
	if(!err) return next();
	console.log(err.stack);
	res.json({error: true});
});

var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
	callback(null, file.originalname);
  }
});
var upload2 = multer({ storage : storage}).single('myfile');

// Main App Page
app.get('/', routes.index);

// MongoDB API Routes
app.post('/api/employees', routes.create);
app.post('/api/update/employees', routes.update);
app.get('/view/employees', routes.list);
app.get('/api/employees/:id', routes.employee);
app.post('/api/authenticate', userRoute.authenticate);
app.get('/api/authenticate', userRoute.authenticate);
app.post('/api/users',userRoute.create);
app.get('/api/users/:userid',userRoute.findByUserId);
app.get('/api/users',userRoute.create);
app.get('/api/employeDetails/:id',routes.employeeDetail);
//app.post('/upload/photos', upload.single('file'), function (req, res, next) {
//	console.log("request: " + req.file);
//	console.log(req.files, 'files');
  // req.body will hold the text fields, if there were any 
  //res.json({success:true});
//})
//app.post('/upload/photos',upload.single('images'),function(req, res) {
	app.post('/upload/photos',upload.single('file'),routes.photoSave);
  app.post('/upload/photosUpdate',upload.single('file'),routes.photoUpdate);
	app.get('/view/photos/:id',routes.viewPhoto);
  app.get('/email-verification/:url',userRoute.permanentCreate);

app.post('/uploadjavatpoint',function(req,res){
	upload2(req,res,function(err) {
    console.log(req.files);
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded successfully!");
	});
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

