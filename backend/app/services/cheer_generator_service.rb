# backend/app/services/cheer_generator_service.rb
require 'open-uri'
require 'base64'

class CheerGeneratorService
  # 文字ベース掛け声生成（このままでOK）
  def self.generate_from_text(cheer_type:, muscle:, pose:, keyword:)
    locals = {
      cheer_type: cheer_type,
      muscle: muscle,
      pose: pose,
      keyword: keyword
    }

    prompt = PromptRenderer.render("cheer_from_text.txt.erb", locals)

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
    #ネストされた JSON レスポンスの中から、実際の出力テキストだけを安全に取り出して、前後の空白を除いて返す処理
    response.dig("choices", 0, "message", "content").to_s.strip
  end

  # 画像ベース掛け声生成
  def self.generate_from_image(image_url:, cheer_type:, muscle:, pose:, keyword:)
  # プロンプト用変数をまとめて定義
  locals = {
    cheer_type: cheer_type,
    muscle: muscle,
    pose: pose,
    keyword: keyword
  }

  # 画像入力に基づくプロンプト生成
  prompt = PromptRenderer.render("cheer_from_image.txt.erb", locals)

  # 拡張子からMIMEタイプを判定（デフォルトは image/jpeg）
  ext = File.extname(URI.parse(image_url).path).delete('.').downcase
  mime_type = case ext
              when "jpg", "jpeg" then "image/jpeg"
              when "png"         then "image/png"
              when "webp"        then "image/webp"
              else "image/jpeg"
              end

  # ローカル用URLに変換して画像データをBase64エンコード
  image_url_for_open = image_url.gsub("localhost:4566", "localstack:4566")
  image_data = URI.open(image_url_for_open).read
  base64_image = Base64.strict_encode64(image_data)
  data_url = "data:#{mime_type};base64,#{base64_image}"

  # GPT-4o Vision モデルに画像とプロンプトを送信
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

    cheer_text = response.dig("choices", 0, "message", "content").to_s.strip

    # 出力が制限された場合（フィルター検知）→ テキストのみの生成にフォールバック
    fallback_triggers = [
      "申し訳ありません",
      "申し訳ない",
      "コンテンツに関する制限",
      "この画像の詳細についてはわかりません"
    ]

    if fallback_triggers.any? { |phrase| cheer_text.include?(phrase) }
      Rails.logger.warn("Vision出力が制限されたため、テキストベース生成にfallbackします")
      return self.generate_from_text(**locals)
    end

    return cheer_text

  rescue => e
    if e.respond_to?(:response) && e.response && e.response[:body]
      Rails.logger.error("OpenAIエラー詳細: #{e.response[:body]}")
    end
    Rails.logger.error("AI生成エラー詳細: #{e.message}\n#{e.backtrace.join("\n")}")
    raise
  end
end
