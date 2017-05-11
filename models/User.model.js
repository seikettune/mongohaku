'use strict';

// Määritellään käyttäjä-schema - Mitä tietoja käyttäjästä tallennetaan MongoDB:hen
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); // Mahdollistaa salasanojen kryptaamisen passportilla 
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10; // Hashatun salasanan pituus

var UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    // Sähköpostia ei voi käyttää kahteen kertaan
    unique: true
  },
  password: {
    type: String,
    bcrypt: true, // kryptataan
    required: true
  }
});

// Autentikoidaan
UserSchema.methods = {
  authenticate: function authenticate(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
    });
  }
};

module.exports = mongoose.model('User', UserSchema);

// Luodaan createUser-metodi (newUSer, callback)
module.exports.createUser = function (newUser, cb) {
  bcrypt.hash(newUser.password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null, function (err, hash) {
    if (err) throw err;
    newUser.password = hash;
    console.log('User is being saved');

    // tallennetaan käyttäjä kantaan
    newUser.save(cb);
  });
};