# app/models/user.rb
class User < ApplicationRecord
  has_many :cheers, dependent: :destroy
  has_many :ai_generation_limits, dependent: :destroy

  validates :clerk_user_id, presence: true, uniqueness: true
  validates :name, length: { maximum: 50 }, allow_blank: true
end
