require('./model/model');
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
mongoose.Promise = require('bluebird');   // To remove deprecation warning node 6676
var cors = require('cors'); // To allow Cross-Origin Restrictions
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');


mongoose.connect('mongodb://localhost:27017/final', { useMongoClient: true });

var app = module.exports = express();


var NODE_ENV = 'development';
app.set('env', process.env.NODE_ENV || 'production');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set('superSecret', 'ThisIsSomethingThatIMustHideFromOthers');
routes = require('./routes/routes');


app.use(expressJWT({ secret: 'ThisIsSomethingThatIMustHideFromOthers' })
    .unless({ path: [new RegExp('/api/v1/getUser.*/', 'i'), new RegExp('/api/v1/getSocialUser.*/', 'i'), '/api/v1/createUser'] }));

app.use('/api', routes);

var port = process.env.PORT || 8888;

app.listen(port);

console.log('Server starts on port ' + port);

