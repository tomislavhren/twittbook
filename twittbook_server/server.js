// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var apiRoutes = express.Router(); 
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');

var morgan = require('morgan');
var jwt    = require('jsonwebtoken');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');
var cors = require('cors');
var formidable = require('formidable');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database



// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());

app.use('/api', apiRoutes);

// routes ======================================================================
require('./app/apiRoutes.js')(apiRoutes,jwt,formidable);
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
