# db/seeds.rb

# Clear existing data to prevent duplicates during re-seeding (optional, but often useful)
puts "Destroying existing CheerTypes, Muscles, and Poses..."
CheerType.destroy_all
Muscle.destroy_all
Pose.destroy_all

puts "Creating CheerTypes..."
# CheerTypes（掛け声タイプ）
cheer_types_data = [
  { name: "熱血", description: "情熱的な応援" },
  { name: "優しめ", description: "柔らかく温かい声援" },
  { name: "おもしろ", description: "ユーモア・笑い系" },
  { name: "クール", description: "渋くてかっこいい系" },
  { name: "元気", description: "明るくハイテンション" },
  { name: "尊敬", description: "リスペクトや称賛" },
  { name: "励まし", description: "背中を押す激励" },
  { name: "仲間ノリ", description: "仲間・友達のノリ" }, # Assuming "仲間ノリ" from "仲間ノリ 仲間・友達のノリ"
  { name: "かわいい", description: "可愛さ・癒し系" },
  { name: "熱狂", description: "熱狂・ハイテンション" }, # Note: "熱狂" appears twice, one description is "熱狂・ハイテンション"
  { name: "伝統的", description: "格言・歴史や仏像例え" },
  { name: "社会ネタ", description: "流行語や社会現象系" },
  { name: "食べ物", description: "食品や料理系の例え" },
  { name: "地名・場所", description: "地名や名所例え" },
  { name: "動物", description: "動物や生き物の例え" },
  { name: "著名人", description: "有名人・キャラクター例え" },
  { name: "アニメ", description: "アニメやマンガ例え" },
  { name: "面白系", description: "ダジャレやネタ系" } # Note: "面白系" seems similar to "おもしろ"
]

cheer_types_data.each.with_index(1) do |type_data, i|
  CheerType.create!(
    name: type_data[:name],
    description: type_data[:description],
    active: true,
    position: i
  )
end
puts "#{CheerType.count} CheerTypes created."

puts "Creating Muscles..."
# Muscles（部位）
muscles_data = [
  { name: "大胸筋", description: "胸" },
  { name: "上腕二頭筋", description: "腕（力こぶ）" },
  { name: "上腕三頭筋", description: "腕の裏側" },
  { name: "三角筋", description: "肩" },
  { name: "広背筋", description: "背中の横" },
  { name: "僧帽筋", description: "首・背中の上部" },
  { name: "腹筋", description: "お腹" },
  { name: "腹斜筋", description: "お腹の脇" },
  { name: "大腿四頭筋", description: "太もも前" },
  { name: "ハムストリング", description: "太もも裏" },
  { name: "カーフ", description: "ふくらはぎ" }, # Assuming "カーフ" is correct, from "カーフ ふくらはぎ"
  { name: "大臀筋", description: "お尻" },
  { name: "前腕", description: "腕（手首から肘）" },
  { name: "背筋全体", description: "背中全体" }, # Assuming "背筋全体" from "背筋 背中全体"
  { name: "下腿", description: "すね" }
]

muscles_data.each.with_index(1) do |muscle_data, i|
  Muscle.create!(
    name: muscle_data[:name],
    description: muscle_data[:description],
    active: true,
    position: i
  )
end
puts "#{Muscle.count} Muscles created."

puts "Creating Poses..."
# Poses（ポーズ）
# Using common bodybuilding poses as placeholders based on your initial examples
poses_data = [
  { name: "フロントダブルバイセップス", description: "正面で両腕を曲げるクラシックポーズ" },
  { name: "バックダブルバイセップス", description: "背面で両腕を曲げるクラシックポーズ" },
  { name: "フロントラットスプレッド", description: "正面で広背筋を広げるポーズ" },
  { name: "バックラットスプレッド", description: "背面で広背筋を広げるポーズ" },
  { name: "サイドチェスト", description: "横向きで胸を強調するポーズ" },
  { name: "サイドトライセップス", description: "横向きで上腕三頭筋を強調するポーズ" },
  { name: "アブドミナルアンドサイ", description: "腹筋と太ももを強調するポーズ" },
  { name: "モストマスキュラー", description: "最も力強い筋肉をアピールするポーズ" },
  { name: "クラシックポーズ", description: "任意のクラシックなフリーポーズ" }, # Generic example
  { name: "リラックスポーズ", description: "規定ポーズ間の自然な立ち姿" } # Generic example
]

poses_data.each.with_index(1) do |pose_data, i|
  Pose.create!(
    name: pose_data[:name],
    description: pose_data[:description],
    active: true,
    position: i
  )
end
puts "#{Pose.count} Poses created."

puts "Seed data creation finished."