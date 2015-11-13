'use strict';

var mongoose = require('mongoose');
var moment = require('moment');

// var momentNow = moment().format('dddd, h:mm a');

var messageSchema = mongoose.Schema({
  username: String,
  message: String,
  date: Date
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;