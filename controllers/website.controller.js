'use strict';

// Tässä kontrollerissa metodit 
// searchResults - Suoritetaan haku mongoosen tarjoamalla search-toiminnolla
// create - Luodaan uusi, sittemmin hakutoiminnolla löydettävä web-sivu 
var Website = require('../models/Website.model');

// Uuden sivun lisäys MongodDB:hen. Schema määritelty /models/Website.model.js
exports.create = function (req, res) {
  // Määritellään uusi muuttuja newWebsite
  var newWebsite = new Website();

  // Uuden lisättävän sivun tiedot request
  newWebsite.title = req.body.title;
  newWebsite.url = req.body.url;
  newWebsite.description = req.body.description;
  newWebsite.submittedBy.id = req.body.id;

  // Tallennus
  newWebsite.save(function (err, result) {
    if (err) {
      console.log('Error saving website');
    } else {
      console.log(result);
      res.status(200).end(); //200 ok
    }
  });
};

// Haku-metodi
exports.searchResults = function (req, res) {
  // Muuttuja searchText
  var searchText = req.body.searchText;
  // Muuttuja syötetään hakuteksti mongoosen hakuplugariin
  // http://github.com/pavelvlasov/mongoose-search-plugin
  Website.search(searchText, {
    title: 1,
    description: 1,
    url: 1
  }, {
    // ehdot
    conditions: {
      title: {
        $exists: true
      },
      description: {
        $exists: true
      },
      url: {
        $exists: true
      }
    },
    // sortataan
    sort: {
      title: 1
    },
    // näytetään 10
    limit: 10
  }, function (err, data) {
    // Onnistuiko haku
    if (err) {
      console.log('cant fetch results');
    } else {
      console.log(data.results);
      res.send(data.results);
    }
  });
};