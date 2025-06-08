# backend/config/routes.rb
Rails.application.routes.draw do
  #「本番環境でAPIだけを動かしている場合によくある」Railsのルーティングエラーの回避
  root to: proc { [200, {}, ['Mukimentary API running']] }
  namespace :api do
    namespace :v1 do
      resources :cheers, only: [:index, :show, :create, :update, :destroy] do
        collection do
          post :generate          # /api/v1/cheers/generate
          post :generate_by_image # /api/v1/cheers/generate_by_image
          post :share_bonus       #/api/v1/cheers/share_bonus
          get :generate_count     #/api/v1/cheers/generate_count
        end
      end
      resources :cheer_types, only: [:index]
      resources :muscles, only: [:index]
      resources :poses, only: [:index]
      post "uploads/presign", to: "uploads#presign" #/api/v1/uploads/presignへのPOSTリクエストをApi::V1::UploadsControllerのpresignアクションにルーティング
    end
  end
end
