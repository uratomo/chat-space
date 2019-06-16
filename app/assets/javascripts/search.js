$(function(){
  var search_list = $("#user-search-result");
  function appendHTML(user){
    var html =`<div class="chat-group-user clearfix">
               <p class="chat-group-user__name">${user.name}</p>
               <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name=${user.name}>追加</div>
               </div>
              `
   search_list.append(html);
  }

  function appendErrMsgToHTML(message){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${message}</p>
                </div>
                `
    search_list.append(html);
  }

  $("#user-search-field").on("keyup",function(){
    var input = $("#user-search-field").val();
    console.log(input)

    $.ajax({
      type: "GET",
      url:  "/users/index",
      data: {keyword: input},
      dataType: "json"
    })

    .done(function(users){
      search_list.empty();
      if (users.length !== 0) {
          users.forEach(function(user){
          appendHTML(user);
        });
      }
      else {
        appendErrMsgToHTML("一致する映画はありません");
      }
    })

    .fail(function(){
      alert("ユーザー検索に失敗しました")
    })
  })
})
