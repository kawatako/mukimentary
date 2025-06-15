# db/migrate/xxxxxxxxxx_change_text_limit_in_cheers.rb
class ChangeTextLimitInCheers < ActiveRecord::Migration[7.1]
  def change
    change_column :cheers, :text, :string, limit: 50
  end
end
