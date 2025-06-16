class CreateCheerListItems < ActiveRecord::Migration[7.1]
  def change
    create_table :cheer_list_items do |t|
      t.references :cheer_my_list, null: false, foreign_key: true
      t.references :cheer, null: false, foreign_key: true

      t.integer :position

      t.timestamps
    end

    # 同一リストに同じcheerが複数登録されないようにユニーク制約
    add_index :cheer_list_items, [:cheer_my_list_id, :cheer_id], unique: true
  end
end
