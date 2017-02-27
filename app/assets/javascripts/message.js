$(function(){
  var currentPath = window.location.pathname.split('/').pop();
  var lastId = 0;
  var reloadMessages;

  function insertMessage(message) {

    var insertImage = '';
    if (message.image) {
      var insertImage = `<img class='chat-main__message-body-image' src='${ message.image }'>`;
    };

    var html = `<li class='chat-main__message clearfix'>
                  <div class='chat-main__message-name'>${ message.name }</div>
                    <div class='chat-main__message-time'>${ message.time }</div>
                  <div class='chat-main__message-body'>${ message.body } ${ insertImage }</div>
                </li>`

    $('.chat-main__body--messages-list').append(html);
  };

  function insertNoticeMessage(flash) {
    var html = `<div class='notice'>${ flash }</div>`
    $('.notification').append(html);
    fadeNoticeMessage();
  };

  function fadeNoticeMessage() {
    setTimeout(function() {
      $('.notification').children().fadeOut('slow');
    }, 3000);
  };

  function scrollToBottom() {
    var pos = $('.chat-main__body--messages-list').height();
    $('.chat-main__body').animate({
      scrollTop: pos
    }, 'slow', 'swing');
  };

  function reloadMessages() {
    if (currentPath == 'messages') {
    setInterval(
      $.ajax({
        url: './messages',
        type: 'get',
        data: lastId,
        dataType: 'json'
      })
      .done(function(data){
        $.each(data.messages, function(i, message){
          insertMessage(message);
        });
        lastId = data.lastId;
      }), 5000);
    };
  };

  reloadMessage();

  $('#message_image').on('change', function() {
    $('#message-form').submit();
  });

  $('#message-form').on('submit', function(e) {
    e.preventDefault();
    formdata = new FormData($(this).get(0));

    $.ajax ({
      url: './messages',
      type: 'post',
      data: formdata,
      dataType: 'json',
      context: $(this),
      processData: false,
      contentType: false
    })
    .done( function(data) {
      insertMessage(data);
      scrollToBottom();
      insertNoticeMessage(data.notice);
      this[0].reset();
    })
    .fail( function() {
      alert('メッセージ送信失敗');
    });
    return false;
  });
});
