# backend/app/services/prompt_renderer.rb
class PromptRenderer
  def self.render(template_name, locals)
    path = Rails.root.join("config", "prompts", template_name)
    ERB.new(File.read(path)).result_with_hash(locals)
  end
end
