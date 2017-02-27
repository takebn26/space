class Groups::MessagesController < ApplicationController

  before_action :set_group, :set_messages, only: [:index, :create]

  def index
    @message  = Message.new

    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @message = current_user.messages.new(message_params)
    if @message.save
      flash.now[:notice] = 'メッセージ送信成功'
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group) }
        format.json
      end
    else
      flash.now[:alert] = 'メッセージ送信失敗'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(group_id: @group.id)
  end

  def set_group
    @group = current_user.groups.find(params[:group_id])
    @groups   = current_user.groups
  end

  def set_messages
    @messages = @group.messages
  end
end
