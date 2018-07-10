var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
// var Book = require('../models/Book.js');


/* GET ALL BOOKS */
router.get('/', function(req, res) {

  console.log("ok");
  res.send('Express RESTful API');
});

module.exports = router;