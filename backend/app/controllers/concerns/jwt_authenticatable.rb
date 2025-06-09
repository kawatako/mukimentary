# app/controllers/concerns/jwt_authenticatable.rb
require 'net/http'
require 'json'
require 'jwt'

module JwtAuthenticatable
  extend ActiveSupport::Concern

  included do
    # すべてのAPIリクエストで認証を要求する
    before_action :authenticate_with_jwt!
  end

  private

  # === メイン処理 ===
  # 1. リクエストヘッダーからJWTトークンを抜き出す
  # 2. トークンの有無・内容（署名/期限等）を検証
  # 3. DB上のユーザー特定（なければ自動作成）
  # 4. @current_userにセット
  def authenticate_with_jwt!
    # Authorizationヘッダーからトークン抜き出し
    token = request.headers['Authorization']&.split&.last

    # トークンが無い場合は「401 Unauthorized」＋JSONエラーメッセージ
    unless token
      render json: { error: "認証に失敗しました。再度ログインしてください。" }, status: :unauthorized and return
    end

    # トークンをデコードして有効性チェック
    payload = decode_jwt(token)
    unless payload
      render json: { error: "認証に失敗しました。再度ログインしてください。" }, status: :unauthorized and return
    end

    # ClerkのsubでDBユーザー検索、なければ自動作成
    @current_user = User.find_by(clerk_user_id: payload['sub'])
    unless @current_user
      @current_user = User.create!(
        clerk_user_id: payload['sub'],
        name: payload['name'], # Clerkのカスタムクレームを使う場合
        username: payload['username'].presence || "user_#{SecureRandom.hex(4)}"
      )
    end
    # @current_userがセットされてAPI本体へ
  end

  # JWTの署名検証・デコード
  def decode_jwt(token)
    jwks_hash = fetch_jwks
    JWT.decode(token, nil, true,
      algorithms: ['RS256'],
      jwks: jwks_hash
    ).first
  rescue
    nil # 失敗時はnil（＝認証失敗扱い）
  end

  # Clerkの公開鍵（JWKS）取得
  def fetch_jwks
    jwks_uri = ENV['CLERK_JWKS_URL']
    jwks_raw = Net::HTTP.get(URI(jwks_uri))
    { keys: JSON.parse(jwks_raw)['keys'] }
    # 本番運用時はこのJWKS取得はキャッシュ推奨
  end
end
