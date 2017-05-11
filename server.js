'use strict';

// Määritellään muuttujat ja vaaditut moduulit
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var path = require('path');

var port = 8080;
var db = 'mongodb://localhost/mongohaku';

var users = require('./routes/user');
var website = require('./routes/website');

// Mongoosen default promiset vanhentuneet. Ohitetaan...
// Mongoose: mpromise (mongoose's default promise library) is deprecated, 
// plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise; //... tällä
mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Standardin mukainen määritys express-sessionia käytettäessä
app.use(session({
  secret: 'cake is a lie', // voi olla mitä vain
  saveUninitialized: true,
  resave: true
}));

// Lisätään passport.js
require('./config/passport')();

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);
app.use('/website', website);

app.listen(port, function () {
  console.log('app listening on port ' + port);
});