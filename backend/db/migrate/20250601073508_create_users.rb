class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
    t.string :clerk_user_id, null: false
    t.string :name
    t.timestamps
    t.index :clerk_user_id, unique: true
    end
  end
end
