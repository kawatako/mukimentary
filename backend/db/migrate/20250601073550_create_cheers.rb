class CreateCheers < ActiveRecord::Migration[7.1]
  def change
    create_table :cheers do |t|
      t.references :user, null: false, foreign_key: true
      t.string :text, null: false, limit: 20
      t.references :cheer_type, foreign_key: true
      t.references :muscle, foreign_key: true
      t.references :pose, foreign_key: true
      t.string :cheer_mode, null: false
      t.string :image_url
      t.string :keyword
      t.timestamps
     end
  end
end
