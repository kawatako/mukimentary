class CreateAiGenerationLimits < ActiveRecord::Migration[7.1]
  def change
    create_table :ai_generation_limits do |t|
    t.references :user, null: false, foreign_key: true
    t.date :date, null: false
    t.string :kind, null: false 
    t.integer :count, null: false
    t.integer :bonus_count, null: false, default: 0
    t.timestamps
    t.index [:user_id, :date, :kind], unique: true
    end
  end
end
