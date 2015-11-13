'use strict';

$(document).ready(init);

function init() {
  console.log('Hello jQuery!');
  $('.submit').click(postMessage);
  $('table').on('click', '.delete', deleteMessage);
}

function postMessage() {
  var message = {};
  message.username = $('input.user-name').val();
  message.message = $('textarea.user-message').val();
  message.date = Date.now();
  $.post('/messages', message)
  .done(function(data){
    var $messageRow = messageRow(message);
    console.log('data:', data);  
    function messageRow(message) {
      var $tr = $('<tr>');
      var ident = data._id;
      console.log("ident", ident);
      var $username = $('<td>').text(message.username).addClass('username');
      var $message = $('<td>').text(message.message).addClass('message');
      var $date = $('<td>').text(message.date).addClass('date');
      var $edit = $('<td>').append($('<a>').text('Edit Message').addClass('waves-effect waves-light btn edit'));
      var $delete = $('<td>').append($('<a>').text('Delete Message').addClass('waves-effect waves-light btn delete'));
      $tr.append($username, $message, $date, $edit, $delete).attr('class', ident);
      $('.user-name').val('');
      $('.user-message').val('');
      return $tr;
    }
    $('tbody').append($messageRow);
  })
  .fail(function(err){
    console.error(err)
  });
}


function deleteMessage(e) {
  var $target = $(e.target);
  console.log("DELETE target: ", $target);
  var $deleteRow = $target.closest('tr');
  console.log("DELETE ROW: ", $deleteRow);
  var ident = $deleteRow.find($('._id'));
  console.log('deleted ident: ', ident);
  var username = $deleteRow.find('.username').text();
  var message = $deleteRow.find('.message').text();
  var date = $deleteRow.find('.date').text();
  $.ajax({
    method: 'DELETE',
    url: '/messages',
    data: {username: username, message: message, date: date}
  })
  .done(function(data){
    $deleteRow.remove();
  })
  .fail(function(err){
    console.error(err);
  });
}

