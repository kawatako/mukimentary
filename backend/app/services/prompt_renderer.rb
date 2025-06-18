# backend/app/services/prompt_renderer.rb
#テンプレートファイルに、変数（cheer_type など）を埋め込んで、1つの文字列（プロンプト）にして返すためのクラス
class PromptRenderer
  def self.render(template_name, locals)
    # config/prompts/ 配下のテンプレートファイルのパスを生成する
    # 例: "cheer_from_text.txt.erb" → Rails.root/config/prompts/cheer_from_text.txt.erb
    path = Rails.root.join("config", "prompts", template_name)

    # ファイルを読み込み、ERBテンプレートとしてインスタンス化し、localsハッシュ内の変数を埋め込んで最終的な文字列を生成する
    ERB.new(File.read(path)).result_with_hash(locals)
  end
end







