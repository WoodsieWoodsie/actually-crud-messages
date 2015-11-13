'use strict';

var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.get('/', function(req, res) {
  Message.find({}, function(err, messagesArr) {
    console.log('messagesArr: ', messagesArr);
    res.render('index', {messagesArr: messagesArr});
  });
});



module.exports = router;
