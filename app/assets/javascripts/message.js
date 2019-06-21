$(document).on('turbolinks:load', function(){
   function buildHTML(message){
    var content = message.content ? `${message.content}`:""; 
    var image = message.image ? `${message.image}`:""; 
    var html = `<div class="message" data-id="${message.id}" data-group-id="${message.group_id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at} 
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${content}
                    </p>
                    <img class="lower-message__image" src=${image} >
                  </div>
                </div>`
    return html;
   }
  $("#new_message").on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(message){
      var html = buildHTML(message);
      $(".messages").append(html);
      $("#new_message")[0].reset();
      $(".form__submit").prop("disabled",false);
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, "fast");  
    })
    .fail(function(){
      alert("そのメッセージは無効です。") 
      $(".form__submit").prop("disabled",false);
    })
  });



  var reloadMessages = function() {
    if ( window.location.href.match(/\/groups\/\d+\/messages/)) { 
    last_message_id = $(".message:last").data("id");
    last_message_group_id = $(".message:last").data("group-id");
    $.ajax({
      url: `/groups/${last_message_group_id}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){ 
      var html = buildHTML(message)
      insertHTML += html
      $(".messages").append(insertHTML)
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, "fast");  
    })
  })
    .fail(function() {
      alert('自動更新に失敗しました。');
    });
    };
   }
    if ( window.location.href.match(/\/groups\/\d+\/messages/)) { 
    setInterval(reloadMessages, 5000);
    
});