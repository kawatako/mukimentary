# app/models/cheer_type.rb
class CheerType < ApplicationRecord
  has_many :cheers

  validates :name, presence: true, uniqueness: true, length: { maximum: 50 }
  validates :description, length: { maximum: 100 }, allow_blank: true
end
