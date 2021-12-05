class VideoCallsController < ApplicationController
  def chat
    @users =
      if user_signed_in?
        User.where.not(id: current_user.id)
      else
        User.all
      end

    # ログイン済みの場合、peer_id を
    # その他は false をvideo_calls/index.jsへ渡す
    gon.user_peer_id = user_signed_in? ? current_user.peer_id : false
  end
end
