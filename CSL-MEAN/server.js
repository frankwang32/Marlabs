var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CSL');
var db = mongoose.connection;
db.on('connected', function(){
	console.log('connected to db');
});
db.on('disconnected', function(){
	console.log('disconnected to db');
});
db.on('error', function(){
	console.log('db connection error', error);
});
process.on('SIGINT', function(){
	db.close(function(){
		console.log('db connection closed due to process termination');
		process.exit(0);
	});
});





// routes ======================================================================
require('./app/routes.js')(app);



app.listen(3000);
console.log("Server running on port 3000");