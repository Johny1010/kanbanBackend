//Load modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Use envirement defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express application
var app = express();

// Connect to the kanban local database
mongoose.connect('mongodb://localhost/kanban');

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

//Pass our application into our routes
require('./app/routes')(app);

//Start the server
app.listen(port);

//Expose app
exports = module.exports = app;