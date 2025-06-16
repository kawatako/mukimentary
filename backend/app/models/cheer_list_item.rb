# app/models/cheer_list_item.rb
class CheerListItem < ApplicationRecord
  belongs_to :cheer_my_list
  belongs_to :cheer

  validates :cheer_id, uniqueness: { scope: :cheer_my_list_id }
end
