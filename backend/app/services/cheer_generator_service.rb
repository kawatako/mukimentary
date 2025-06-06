# backend/app/services/cheer_generator_service.rb
require 'open-uri'
require 'base64'

class CheerGeneratorService
  # 文字ベース掛け声生成（このままでOK）
  def self.generate_from_text(cheer_type:, muscle:, pose:, keyword:)
    prompt = PromptRenderer.render(
      "cheer_from_text.txt.erb",
      cheer_type: cheer_type,
      muscle: muscle,
      pose: pose,
      keyword: keyword
    )
    client = OpenAI::Client.new
    response = client.chat(
      parameters: {
        model: "gpt-4.1-nano",
        messages: [
          { role: "system", content: prompt }
        ],
        max_tokens: 64,
        temperature: 0.7
      }
    )
    response.dig("choices", 0, "message", "content").to_s.strip
  end

  # 画像ベース掛け声生成（ここを修正）
def self.generate_from_image(image_url:, cheer_type:, muscle:, pose:, keyword:)
  prompt = PromptRenderer.render(
    "cheer_from_image.txt.erb",
    cheer_type: cheer_type,
    muscle: muscle,
    pose: pose,
    keyword: keyword
  )

  ext = File.extname(URI.parse(image_url).path).delete('.').downcase
  mime_type =
    case ext
    when "jpg", "jpeg" then "image/jpeg"
    when "png"         then "image/png"
    when "webp"        then "image/webp"
    else "image/jpeg"
    end

  # S3/LocalStackへのアクセス
  image_url_for_open = image_url.gsub("localhost:4566", "localstack:4566")
  image_data = URI.open(image_url_for_open).read
  base64_image = Base64.strict_encode64(image_data)
  data_url = "data:#{mime_type};base64,#{base64_image}"

  client = OpenAI::Client.new
  begin
    response = client.chat(
      parameters: {
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: data_url } }
            ]
          }
        ],
        max_tokens: 64,
        temperature: 0.7
      }
    )
    Rails.logger.debug(response.inspect)
    response.dig("choices", 0, "message", "content").to_s.strip
  rescue => e
    if e.respond_to?(:response) && e.response && e.response[:body]
      Rails.logger.error("OpenAIエラー詳細: #{e.response[:body]}")
    end
    Rails.logger.error("AI生成エラー詳細: #{e.message}\n#{e.backtrace.join("\n")}")
    raise
  end
end

end
