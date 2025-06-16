class CreateCheerMyLists < ActiveRecord::Migration[7.1]
  def change
    create_table :cheer_my_lists do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false

      t.timestamps
    end
  end
end
