# db/seeds.rb

# Clear existing data to prevent duplicates during re-seeding (optional, but often useful)
puts "Destroying existing CheerTypes, Muscles, and Poses..."
CheerType.destroy_all
Muscle.destroy_all
Pose.destroy_all

puts "Creating CheerTypes..."
# CheerTypes（掛け声タイプ）
cheer_types_data = [
  { name: "大阪弁", description: "「めっちゃ」「あかん」「〜してはる」など" },
  { name: "東京弁", description: "標準語、特徴なし" },
  { name: "京都弁", description: "「〜どす」、「〜やす」「おいでやす」など" },
  { name: "広島弁", description: "「じゃけえ」という語尾" },
  { name: "博多弁", description: "語尾に「〜と？」「〜たい」「〜ばい」など" },
  { name: "津軽弁", description: "「どさ」「ゆさ」「け」など" },
  { name: "仙台弁", description: "「〜だっちゃ」「いぎなり」「おばんです」など" },
  { name: "沖縄方言", description: "「めんそーれ」「にふぇーでーびる」「ちゅらさん」など" },
  { name: "身近な日常で例える", description: "日常のものや出来事にたとえる" },
  { name: "時事ネタで例える", description: "時事的ニュースや出来事にたとえる" },
  { name: "食べ物に例える", description: "食べものにたとえる" },
  { name: "動物に例える", description: "動物にたとえる" },
  { name: "地名・場所に例える", description: "地名や場所にたとえる" },
  { name: "著名人に例える", description: "有名人や著名キャラクターにたとえる" },
  { name: "アニメに例える", description: "アニメやマンガにたとえる" },
  { name: "映画に例える", description: "映画作品にたとえる" }
];


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
  { name: "カーフ", description: "ふくらはぎ" }, 
  { name: "大臀筋", description: "お尻" },
  { name: "前腕", description: "腕（手首から肘）" },
  { name: "背筋全体", description: "背中全体" },
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
  { name: "クラシックポーズ", description: "任意のクラシックなフリーポーズ" },
  { name: "リラックスポーズ", description: "規定ポーズ間の自然な立ち姿" } 
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