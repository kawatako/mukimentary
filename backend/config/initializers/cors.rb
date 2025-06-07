# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins(
      'http://localhost:3000',               # 開発用Next.js
      'http://localhost:4000',               # 開発用Rails API
      'https://mukimentary.vercel.app',      # Vercel側初期ドメイン（Preview）一時的
      'http://mukimentary.com',              # 独自ドメイン
      'https://mukimentary.com'              # 念のため https も許可
    )

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
