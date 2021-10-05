class VideoCallsController < ApplicationController
  def chat
    gon.api_key = ENV["SKY_WAY_API_KEY"]
  end
end
