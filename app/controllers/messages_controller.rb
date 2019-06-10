class MessagesController < ApplicationController
  before_action :set_group 
  def index
    @message= Message.new
    @messages = @group.messages.includes(:user)
  end
  
  def create
    @message=@group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group),notice: "メッセージが送信されました。"
    else
      @messages=@group.messages.includes(:user)
      flash.now[:alert] = "メッセージは送信されました"
      render :index
    end
  end

  private
  def set_group
  @group=Group.find(params[:group_id])
  end
end
