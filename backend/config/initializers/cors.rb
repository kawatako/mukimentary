# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:4000', 'http://localhost:3000' # フロント（Next.js）・API両方許可
    # 本番環境では "https://your-frontend-domain.com" も追加

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true # 必要ならCookieや認証も許可
  end
end
