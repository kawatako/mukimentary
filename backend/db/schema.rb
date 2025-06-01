ActiveRecord::Schema[7.1].define(version: 2025_06_01_073555) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ai_generation_limits", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.date "date", null: false
    t.string "kind", null: false
    t.integer "count", null: false
    t.integer "bonus_count", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "date", "kind"], name: "index_ai_generation_limits_on_user_id_and_date_and_kind", unique: true
    t.index ["user_id"], name: "index_ai_generation_limits_on_user_id"
  end

  create_table "cheer_types", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.boolean "active", default: true, null: false
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cheers", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "text", limit: 20, null: false
    t.bigint "cheer_type_id"
    t.bigint "muscle_id"
    t.bigint "pose_id"
    t.string "cheer_mode", null: false
    t.string "image_url"
    t.string "keyword"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cheer_type_id"], name: "index_cheers_on_cheer_type_id"
    t.index ["muscle_id"], name: "index_cheers_on_muscle_id"
    t.index ["pose_id"], name: "index_cheers_on_pose_id"
    t.index ["user_id"], name: "index_cheers_on_user_id"
  end

  create_table "muscles", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.boolean "active", default: true, null: false
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "poses", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.boolean "active", default: true, null: false
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "clerk_user_id", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["clerk_user_id"], name: "index_users_on_clerk_user_id", unique: true
  end

  add_foreign_key "ai_generation_limits", "users"
  add_foreign_key "cheers", "cheer_types"
  add_foreign_key "cheers", "muscles"
  add_foreign_key "cheers", "poses"
  add_foreign_key "cheers", "users"
end
