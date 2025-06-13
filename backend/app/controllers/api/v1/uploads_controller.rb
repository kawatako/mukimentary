# backend/app/controllers/api/v1/uploads_controller.rb
module Api
  module V1
    class UploadsController < ApplicationController
      before_action :authenticate_with_jwt!

      # POST /api/v1/uploads/presign
      def presign
        ext = params[:ext].to_s.downcase
        size = params[:size].to_i
        allowed_exts = %w[jpg jpeg png webp]
        max_size = 5.megabytes
        max_uploads_per_day = 20

        # --- バリデーション ---
        unless allowed_exts.include?(ext)
          return render json: { error: "拡張子が不正です" }, status: :unprocessable_entity
        end

        if size > max_size
          return render json: { error: "ファイルサイズが大きすぎます（最大5MB）" }, status: :unprocessable_entity
        end

        today = Time.zone.today
        uploads_today = Cheer.where(user_id: @current_user.id)
                             .where("created_at >= ?", today)
                             .where.not(image_url: [nil, ""])
                             .count

        if uploads_today >= max_uploads_per_day
          return render json: { error: "1日のアップロード上限（#{max_uploads_per_day}枚）に達しました" }, status: :forbidden
        end

        # --- S3キー・バケット設定 ---
        uuid = SecureRandom.uuid
        user_id = @current_user.id
        object_key = "cheers/#{user_id}/#{uuid}.#{ext}"
        bucket_name = ENV.fetch("S3_BUCKET")
        region = ENV.fetch("AWS_REGION")

        # --- S3 PresignerによるPUT用署名付きURL生成 ---
        presigner = Aws::S3::Presigner.new(
          region: region,
          access_key_id: ENV["AWS_ACCESS_KEY_ID"],
          secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
          endpoint: ENV["S3_ENDPOINT"].presence, # LocalStackなど
          force_path_style: ENV["S3_ENDPOINT"].present?
        )

        upload_url = presigner.presigned_url(
          :put_object,
          bucket: bucket_name,
          key: object_key,
          content_type: "image/#{ext}",
          expires_in: 600
        )

        # --- 公開URL（誰でもアクセス可能） ---
        public_url = "https://#{bucket_name}.s3.#{region}.amazonaws.com/#{object_key}"

        # --- LocalStack用にホスト名を変換（開発環境対応） ---
        if ENV["S3_ENDPOINT"].present?
          upload_url = upload_url.gsub("localstack:4566", "localhost:4566")
          public_url = public_url.gsub("localstack:4566", "localhost:4566")
        end

        # --- 結果返却 ---
        render json: {
          upload_url: upload_url,
          public_url: public_url
        }
      end
    end
  end
end
