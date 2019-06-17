class Api::MessagesController < ApplicationController
  def index
    @message = Message.where(id:)
  end
end
