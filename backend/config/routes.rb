#backend/config/routes.rb

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :cheers, only: [:index]
      resources :cheer_types, only: [:index]
      resources :muscles, only: [:index]
      resources :poses, only: [:index]
    end
  end
end