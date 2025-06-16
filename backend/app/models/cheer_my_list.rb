# app/models/cheer_my_list.rb
class CheerMyList < ApplicationRecord
  belongs_to :user
  has_many :cheer_list_items, dependent: :destroy
  has_many :cheers, through: :cheer_list_items

  validates :name, presence: true
end
