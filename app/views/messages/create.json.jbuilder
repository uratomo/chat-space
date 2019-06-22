  json.name     @message.user.name
  json.id        @message.id
  json.created_at     @message.created_at.strftime("%Y/%m/%d %H:%M")
  json.content  @message.content
  json.image    @message.image.url
  json.group_id @message.group.id