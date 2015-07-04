var router = require('express').Router();
var Contact = require('../models/contact')
// var Q = require('q');
// var moment = require('moment');
// var MongoClient = require('mongodb').MongoClient
// var _ = require('underscore');

router.route('/')
  .get(function(req, res) {
    res.json({message: 'hooray! welcome to our clients api endpoint!'});
  });

module.exports = router;
