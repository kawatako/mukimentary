# app/controllers/concerns/jwt_authenticatable.rb
require 'net/http'
require 'json'
require 'jwt'

module JwtAuthenticatable
  extend ActiveSupport::Concern

  included do
    # コントローラの各APIアクションの前に「authenticate_with_jwt!」を必ず実行
    before_action :authenticate_with_jwt!
  end

  private

	#「ヘッダーからトークンを抜き→正当性を検証→ユーザーDB検索→なければ自動作成→@current_userにセット」
  # === ① リクエストごとにJWT認証を行うメイン処理 ===
  def authenticate_with_jwt!
    # リクエストヘッダーからAuthorizationのJWTトークンを取り出す
    token = request.headers['Authorization']&.split&.last
    # トークンがなければ401 Unauthorizedで即終了
    head :unauthorized and return unless token

    # トークンの内容を検証・デコード（署名検証・期限・発行元などを含む）
    payload = decode_jwt(token)
    # 不正なトークンや期限切れの場合も401
    head :unauthorized and return unless payload

    # JWTのsub（ClerkのユーザーID）でDBユーザーを検索
    @current_user = User.find_by(clerk_user_id: payload['sub'])
    unless @current_user
      # ユーザーがDBに存在しなければ自動作成（初回サインイン時）
      @current_user = User.create!(
        clerk_user_id: payload['sub'],
        name: payload['name'] # Clerkのカスタムクレームを使う場合
      )
    end
    # 認証に成功したら@current_userにセットし、以降のアクションで利用可能
  end

	# 「JWTの署名や期限をClerk公開鍵で検証し、中身のpayload（ユーザー情報）を取得」
  # === ② JWTの署名検証とデコード処理 ===
  def decode_jwt(token)
    jwks_hash = fetch_jwks
    # JWT.decodeでClerk公開鍵（JWKS）を使ってトークンを検証
    # 成功したらpayload（中身のデータ）が返る
    JWT.decode(token, nil, true,
      algorithms: ['RS256'],
      jwks: jwks_hash
    ).first
  rescue
    # 失敗時はnilを返す（例外を飲み込む形。必要ならログ出力も追加可）
    nil
  end

	#「Clerk公式の公開鍵セット（JWKS）をWeb経由で取得し、decode_jwtの検証材料として返す」
  # === ③ Clerkの公開鍵（JWKS）を外部エンドポイントから取得する処理 ===
  def fetch_jwks
    # .env等で設定したCLERK_JWKS_URLから公開鍵セット（JSON形式）を取得
    jwks_uri = ENV['CLERK_JWKS_URL']
    jwks_raw = Net::HTTP.get(URI(jwks_uri))
    # 取得したJSONをRubyハッシュ形式（{ keys: [...] }）に整形
    { keys: JSON.parse(jwks_raw)['keys'] }
    # ※パフォーマンスのため本番ではキャッシュ推奨！
  end
end
