$(function(){

  var preInput;

  function appendUser(user) {
    var html = `<li class='chat-group-user clearfix'>
                  <div class='chat-group-user__name'>${ user.name }</div>
                  <div class='chat-group-user__btn chat-group-user__btn--add'
                   data-name='${ user.name }' data-id='${ user.id }'>追加</div>
                </li>`;

    $('#user-search-result').append(html);
  };

  function appendMember(name, id) {
    var html = `<li class='chat-group-user clearfix'>
                  <div class='chat-group-user__name'>${ name }</div>
                  <div class='chat-group-user__btn
                   chat-group-user__btn--remove'>削除</div>
                  <input type='hidden' value='${ id }' name='group[user_ids][]'>
                </li>`;

    $('#chat-group-users').append(html);
  };

  $('#user-search-result').on('click', '.chat-group-user__btn--add', function(){
    var name = $(this).data('name');
    var id   = $(this).data('id');
    appendMember(name, id);
    $(this).parent().remove();
  });

  $('#chat-group-users').on('click', '.chat-group-user__btn--remove', function() {
    $(this).parent().remove();
  });

  $('#user-search-field').on('keyup', function() {

    $('#user-search-result').empty();
    var input = $(this).val();

    if ( input !== preInput) {
      $.ajax({
        url: '/users/search',
        type: 'get',
        data: { keyword: input },
        dataType: 'json',
      })

      .done(function (data) {
        $.each (data.users, function (i, user) {
          appendUser(user);
        });
      })
      .fail( function() {
        alert('やり直してください');
      });
      preInput = input;
    };
  });
});
