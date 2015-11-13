'use strict';

var express = require('express');
var router = express.Router();

var Message = require('../models/message');


router.get('/', function(req, res) {
  Message.find({}, function(err, messagesArr) {
    res.send(messagesArr);
  });
});

router.post('/', function(req, res) {
  var message = new Message(req.body);
  message.save(function(err, savedMessage) {
    res.send(savedMessage);
  });
});

router.delete('/', function(req, res) {
  console.log("REMOVE req.body", req.body);
  console.log("REMOVE req.body._id", req.body._id);
  Message.findByIdAndRemove({_id: req.body._id}, req.body, function(err, message) {
    res.send();
  });
});

module.exports = router;