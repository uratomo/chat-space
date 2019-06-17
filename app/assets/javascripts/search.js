$(function(){
  var search_list = $("#user-search-result");
  function appendHTML(user){
    var html =`<div class="chat-group-user clearfix">
               <p class="chat-group-user__name">${user.name}</p>
               <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" id="chat-group-user-${user.id}"data-user-id="${user.id}" data-user-name=${user.name}>追加</div>
               </div>
              `
   search_list.append(html);
  }

  function appendErrMsgToHTML(message){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${message}</p>
                </div>`
    search_list.append(html);
  }

  function apppendMemberlist(id,name){
      var html = `<div class="chat-group-user clearfix" >
                    <input name="group[user_ids][]" value="${id}" type="hidden" id="group_id">
                    <p class="chat-group-user__name">
                      ${name}
                    </p>
                    <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                  </div>`
    $("#chat-group-users").append(html)
    $(`#chat-group-user-${id}`).parent().remove()
  }

  $("#user-search-field").on("keyup",function(){
    var input = $("#user-search-field").val();

    $.ajax({
      type: "GET",
      url:  "/users/index",
      data: {keyword: input,},
      dataType: "json"
    })

    .done(function(users){ 
      search_list.empty();
      if (users.length !== 0) {
          users.forEach(function(user){
          appendHTML(user);
            $(document).on("click", `#chat-group-user-${user.id}`, function (){
              var memberId = $(this).data("user-id");
              var memberName = $(this).data("user-name");
                apppendMemberlist(memberId , memberName)

            }) 
            $(document).on("click",`.chat-group-user__btn--remove`,function(){
              $(this).parent().remove()
            })
        });
      }
      else {
        appendErrMsgToHTML("一致するメンバーはいません");
      }
    })

    .fail(function(){
      alert("ユーザー検索に失敗しました")
    })
  })
})
