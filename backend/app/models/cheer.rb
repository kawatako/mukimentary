# app/models/cheer.rb
class Cheer < ApplicationRecord
  belongs_to :user
  belongs_to :cheer_type, optional: true
  belongs_to :muscle, optional: true
  belongs_to :pose, optional: true

  validates :text, presence: true, length: { maximum: 50 }
  validates :cheer_mode, presence: true, inclusion: { in: %w(manual ai image_ai) }
end
