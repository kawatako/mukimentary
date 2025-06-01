#app/models/muscle.rb
class Muscle < ApplicationRecord
  has_many :cheers

  validates :name, presence: true, uniqueness: true, length: { maximum: 20 }
  validates :description, length: { maximum: 100 }, allow_blank: true
end
