class CreatePoses < ActiveRecord::Migration[7.1]
  def change
    create_table :poses do |t|
      t.string :name, null: false
      t.string :description
      t.boolean :active, null: false, default: true
      t.integer :position
      t.timestamps
    end
  end
end
