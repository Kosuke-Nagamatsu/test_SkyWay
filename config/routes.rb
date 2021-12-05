Rails.application.routes.draw do
  devise_for :users
  root 'tops#index'
  get 'video_calls/chat'
end
