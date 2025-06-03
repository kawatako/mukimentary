# backend/app/services/cheer_generator_service.rb
class CheerGeneratorService
  # 文字ベース掛け声生成
  def self.generate_from_text(cheer_type:, muscle:, pose:, keyword:)
    prompt = PromptRenderer.render(
      "cheer_from_text.txt.erb",
      cheer_type: cheer_type,
      muscle: muscle,
      pose: pose,
      keyword: keyword
    )
    # ここでOpenAI API呼び出し
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

  # 画像ベース掛け声生成
  def self.generate_from_image(image_url:, cheer_type:, muscle:, pose:, keyword:)
    prompt = PromptRenderer.render(
      "cheer_from_image.txt.erb",
      cheer_type: cheer_type,
      muscle: muscle,
      pose: pose,
      keyword: keyword
    )
    client = OpenAI::Client.new
    response = client.chat(
      parameters: {
        model: "gpt-4o",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: { type: "image_url", image_url: image_url } }
        ],
        max_tokens: 64,
        temperature: 0.7
      }
    )
    response.dig("choices", 0, "message", "content").to_s.strip
  end
end
