#backend/config/routes.rb
Rails.application.routes.draw do
  namespace :api do
  namespace :v1 do
    resources :cheers, only: [:index]
  end
end
end
