Rails.application.routes.draw do
  root 'tops#index'
  get 'video_calls/chat'
end
