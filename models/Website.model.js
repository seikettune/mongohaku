'use strict';

var mongoose = require('mongoose');
var searchPlugin = require('mongoose-search-plugin'); // Mongoosen mukana tullut haku-plugari
var Schema = mongoose.Schema;

// Määritellään mitä tietoja vaaditaan lisättäessä uusia sivuja 'hakukoneeseen'.
var WebsiteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  // Käyttäjä, joka lisää uuden linkin hakuun.
  submittedBy: {
    id: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Tiedot joilla voidaan hakea 
WebsiteSchema.plugin(searchPlugin, {
  fields: ['title', 'url', 'description']
});

module.exports = mongoose.model('Website', WebsiteSchema);