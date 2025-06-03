# backend/app/models/ai_generation_limit.rb

class AiGenerationLimit < ApplicationRecord
  belongs_to :user

  # 種類（"text_ai" or "image_ai"）のバリデーション
  validates :kind, presence: true, inclusion: { in: %w[text_ai image_ai] }
  validates :date, presence: true
  validates :count, numericality: { greater_than_or_equal_to: 0 }
  validates :bonus_count, numericality: { greater_than_or_equal_to: 0 }

  # 既存レコードの取得 or 新規作成（ユーザーごと・日付ごと・種別ごと）
  def self.for(user, kind, date = Date.current)
    where(user: user, kind: kind, date: date).first_or_create do |limit|
      limit.count = 0
      limit.bonus_count = 0
    end
  end

  # 利用回数増加（制限ロジックとセットで呼ぶ）
  def increment_count!(n = 1)
    update!(count: self.count + n)
  end

  # シェアボーナス回数増加
  def increment_bonus!(n = 1)
    update!(bonus_count: self.bonus_count + n)
  end

  # 利用可能な最大回数（ベース＋ボーナス）
  def max_count
    base = kind == "image_ai" ? 3 : 5
    base + bonus_count
  end

  # まだ利用可能か判定
  def available?
    count < max_count
  end

  # 残り回数を返す
  def remaining
    [max_count - count, 0].max
  end
end
