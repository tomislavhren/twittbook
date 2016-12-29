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
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');
var facebookApi = require('./app/facebook.js');
var cors = require('cors');

var formidable = require('formidable');
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());

app.use('/api', apiRoutes);

app.set('view engine', 'ejs'); // set up ejs for templating


// routes ======================================================================
require('./app/apiRoutes.js')(apiRoutes,jwt,formidable);
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
