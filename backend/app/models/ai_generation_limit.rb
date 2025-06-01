# app/models/ai_generation_limit.rb
class AiGenerationLimit < ApplicationRecord
  belongs_to :user

  validates :date, presence: true
  validates :kind, presence: true, inclusion: { in: %w(text_ai image_ai) }
  validates :count, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :bonus_count, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
