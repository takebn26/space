$(function() {
  var currentPath = window.location
                          .pathname
                          .split('/')
                          .pop();

  function insertMessage(message) {
    var insertImage = message.image ?
      `<img class="chat-main__message-body-image" src="${message.image}">` : '';

    var html = `<li class="chat-main__message clearfix" data-id=${message.id}>
      <div class="chat-main__message-name">${message.name}</div>
      <div class="chat-main__message-time">${message.time}</div>
      <div class="chat-main__message-body">${message.body} ${insertImage}</div>
    </li>`;

    $('.chat-main__body--messages-list').append(html);
  }

  function insertNotification(flash) {
    var $html = $(`<div class="notice">${flash}</div>`);
    $('.notification').append($html);
    $html.delay(3000).fadeOut('slow');
  }

  function scrollToBottom() {
    var pos = $('.chat-main__body--messages-list').height();
    $('.chat-main__body').animate({
      scrollTop: pos
    }, 'slow', 'swing');
  }

  function fetchDiff() {
    console.log($('.chat-main__message').last().data('id'))
    lastId = $('.chat-main__message').last().data('id') || 0;
    $.ajax({
      url: './messages',
      method: 'GET',
      data: {
        last_id: lastId,
      },
      dataType: 'json'
    }).done(function(data) {
      if (data.length != 0) {
        $.each(data.messages, function(i, message) {
          insertMessage(message);
        });
      }
    });
  }

  function reloadMessage() {
    if (currentPath == 'messages') {
      setInterval(fetchDiff, 5000);
    }
  }
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
      context: this,
      processData: false,
      contentType: false,
    })
    .done( function(data) {
      insertMessage(data);
      insertNotification(data.notice);
      scrollToBottom();
      this.reset();
    })
    .fail( function() {
      alert('メッセージ送信失敗');
    });
    return false;
  });
});
