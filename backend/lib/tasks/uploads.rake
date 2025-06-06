namespace :uploads do
  desc "未参照のS3画像をクリーンアップ"
  task cleanup_unused: :environment do
    require "aws-sdk-s3"

    s3 = Aws::S3::Resource.new(
      region: ENV["AWS_REGION"] || "ap-northeast-1",
      access_key_id: ENV["AWS_ACCESS_KEY_ID"],
      secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
      endpoint: ENV["S3_ENDPOINT"].presence, # LocalStackなら
      force_path_style: ENV["S3_ENDPOINT"].present?
    )
    bucket_name = ENV["S3_BUCKET"] || "uploads"

    bucket = s3.bucket(bucket_name)
    # 例: uploads/cheers/配下すべて
    bucket.objects(prefix: "uploads/cheers/").each do |obj|
      # DB（cheers.image_url）に使われているか判定
      used = Cheer.where("image_url LIKE ?", "%#{obj.key}%").exists?
      unless used
        puts "削除: #{obj.key}"
        obj.delete
      end
    end
    puts "未参照ファイルのクリーンアップ完了"
  end
end
