$(function(){
   function buildHTML(message){
    var html = `.message
                  .upper-message
                    .upper-message__user-name
                      = message.user.name
                    .upper-message__date
                      = message.date
                  .lower-message
                    - if message.content.present?
                      %p.lower-message__content
                        = message.content
                    = image_tag message.image.url, class: 'lower-message__image' if message.image.present?`
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
    .done(function(data){
      var html = buildHTML(data);
      $(".messages").append(html)
      $("#message_content").val("")
    })
    .fail(function(){
      alert("そのメッセージは無効です。") 
    })
  });
});