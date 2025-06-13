# backend/app/controllers/api/v1/uploads_controller.rb
module Api
  module V1
    class UploadsController < ApplicationController
      # JWT認証を必須化（ログインユーザーのみ利用可）
      before_action :authenticate_with_jwt!

      # === S3署名付きURL発行エンドポイント ===
      # POST /api/v1/uploads/presign
      def presign
        ext = params[:ext].to_s.downcase   # ファイル拡張子
        size = params[:size].to_i          # ファイルサイズ（バイト単位）
        allowed_exts = %w[jpg jpeg png webp]
        max_size = 5.megabytes
        max_uploads_per_day = 20

        # --- 拡張子・サイズバリデーション ---
        unless allowed_exts.include?(ext)
          render json: { error: "拡張子が不正です" }, status: :unprocessable_entity and return
        end
        if size > max_size
          render json: { error: "ファイルサイズが大きすぎます（最大5MB）" }, status: :unprocessable_entity and return
        end

        # --- アップロード枚数バリデーション ---
        today = Time.zone.today
        uploads_today = Cheer.where(user_id: @current_user.id)
                              .where('created_at >= ?', today)
                              .where.not(image_url: [nil, ""])
                              .count
        if uploads_today >= max_uploads_per_day
          render json: { error: "1日のアップロード上限（#{max_uploads_per_day}枚）に達しました" }, status: :forbidden and return
        end

        # --- 保存パス生成 ---
        uuid = SecureRandom.uuid
        user_id = @current_user.id
        object_key = "cheers/#{user_id}/#{uuid}.#{ext}"

        # --- S3初期化 ---
        s3 = Aws::S3::Resource.new(
          region: ENV["AWS_REGION"],
          access_key_id: ENV["AWS_ACCESS_KEY_ID"],
          secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
          endpoint: ENV["S3_ENDPOINT"].presence,
          force_path_style: ENV["S3_ENDPOINT"].present?
        )

        bucket_name = ENV.fetch("S3_BUCKET")
        obj = s3.bucket(bucket_name).object(object_key)

        # --- オプションをまとめて渡す（headersでpublic-read） ---
        options = {
          expires_in: 600,
          content_type: "image/#{ext}",
          headers: {
            "x-amz-acl" => "public-read"
          }
        }

        presigned_url = obj.presigned_url(:put, **options)
        public_url = obj.public_url

        # --- LocalStackホスト書き換え ---
        if ENV["S3_ENDPOINT"].present? && presigned_url.include?("localstack:4566")
          upload_url = presigned_url.gsub("localstack:4566", "localhost:4566")
          public_url = public_url.gsub("localstack:4566", "localhost:4566")
        else
          upload_url = presigned_url
        end

        render json: {
          upload_url: upload_url,
          public_url: public_url
        }
      end
    end
  end
end
