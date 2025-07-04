# backend/app/controllers/api/v1/cheers_controller.rb
module Api
  module V1
    class CheersController < ApplicationController
      # 認証ミドルウェアはApplicationControllerでinclude済み

      # GET /api/v1/cheers
      def index
        # --- パラメータ取得 ---
        page = params[:page].to_i > 0 ? params[:page].to_i : 1
        per_page = 20

        # 複数ID指定のため配列化（params[:pose] は "1,2" などのカンマ区切りで来る想定）
        pose_ids = (params[:pose]&.split(",") || []).map(&:to_i)
        muscle_ids = (params[:muscle]&.split(",") || []).map(&:to_i)

        # --- 絞り込み条件を構築 ---
        cheers_scope = @current_user.cheers

        if pose_ids.present?
          cheers_scope = cheers_scope.where(pose_id: pose_ids)
        end

        if muscle_ids.present?
          cheers_scope = cheers_scope.where(muscle_id: muscle_ids)
        end

        # --- 総件数を事前にカウントしてページ数を計算 ---
        total_count = cheers_scope.count
        total_pages = (total_count / per_page.to_f).ceil

        # --- 並び順・ページング ---
        cheers = cheers_scope
                    .order(created_at: :desc)
                    .offset((page - 1) * per_page)
                    .limit(per_page)
        render json: {
          cheers: cheers.as_json(include: [:cheer_type, :muscle, :pose]),
          total_pages: total_pages
        }
      end

      # GET /api/v1/cheers/:id
      def show
        cheer = @current_user.cheers.find_by(id: params[:id])
        return head :not_found unless cheer
        render json: cheer.as_json(include: [:cheer_type, :muscle, :pose])
      end

      # POST /api/v1/cheers
      def create
        cheer = @current_user.cheers.new(cheer_params)
        if cheer.save
          render json: cheer, status: :created
        else
          render json: { errors: cheer.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/cheers/:id
      def update
        cheer = @current_user.cheers.find_by(id: params[:id])
        return head :not_found unless cheer
        if cheer.update(cheer_params)
          render json: cheer
        else
          render json: { errors: cheer.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/cheers/:id
      def destroy
        cheer = @current_user.cheers.find_by(id: params[:id])
        return head :not_found unless cheer
        cheer.destroy
        head :no_content
      end

      # POST /api/v1/cheers/generate
      # 文字入力から掛け声生成
def generate
  # 1. 回数制限チェック（ここは今のままでOK）
  limit = AiGenerationLimit.for(@current_user, "text_ai")
  unless limit.available?
    message =
      if limit.bonus_count > 0
        "1日の利用制限を超えました、また明日お試しください"
      else
        "1日の利用制限を超えました。サービスをシェアして利用回数を追加できます。"
      end
    return render json: { error: message }, status: :forbidden
  end

  # 2. パラメータ検証（必要ならここでvalidate）
  %i[cheer_type muscle pose keyword].each do |param|
    params[param] ||= ""
  end

  # 3. サービス層でAI生成（例外補足）
  cheer_text = nil
  begin
    cheer_text = CheerGeneratorService.generate_from_text(
      cheer_type: params[:cheer_type],
      muscle: params[:muscle],
      pose: params[:pose],
      keyword: params[:keyword]
    )
  rescue => e
    Rails.logger.error("AI生成エラー: #{e.class}: #{e.message}")
    return render json: { error: "AI生成中にエラーが発生しました" }, status: :internal_server_error
  end

  # 4. 正常に生成できた場合だけカウントアップ
  limit.increment_count!

  # 5. 結果を返す
  render json: { result: cheer_text }
end

      # POST /api/v1/cheers/generate_by_image
      # 画像＋テキスト入力から掛け声生成
def generate_by_image
  # --- 残数チェックだけは先に ---
  limit = AiGenerationLimit.for(@current_user, "image_ai")
  unless limit.available?
    message =
      if limit.bonus_count > 0
        "1日の利用制限を超えました、また明日お試しください"
      else
        "1日の利用制限を超えました。サービスをシェアして利用回数を追加できます。"
      end
    return render json: { error: message }, status: :forbidden
  end

  # --- パラメータチェックはここで ---
  %i[cheer_type muscle pose keyword].each { |param| params[param] ||= "" }
  image_url = params[:image_url]
  if image_url.blank?
    return render json: { error: "画像URLがありません" }, status: :unprocessable_entity
  end

  # --- AI生成本体（ここで失敗した場合も回数は減らない）---
  begin
    cheer_text = CheerGeneratorService.generate_from_image(
      image_url: image_url,
      cheer_type: params[:cheer_type],
      muscle: params[:muscle],
      pose: params[:pose],
      keyword: params[:keyword]
    )
  rescue => e
    Rails.logger.error("AI生成エラー: #{e.message}")
    return render json: { error: "AI生成中にエラーが発生しました" }, status: :internal_server_error
  end

  # --- ここでだけ利用回数増やす ---
  limit.increment_count!

  render json: { result: cheer_text }
end

      # POST /api/v1/cheers/share_bonus シェアボーナス付与API
      def share_bonus
        #今回のAI生成リクエストがテキストベースなのか画像ベースなのか
        kind = params[:kind] || "text_ai" # "text_ai" or "image_ai"
        limit = AiGenerationLimit.for(@current_user, kind)
        # すでにシェアボーナス加算済みの場合は2回目を弾く
        if limit.bonus_count >= 1
          return render json: { error: "本日のシェアボーナスはすでに付与されています" }, status: :forbidden
        end

        limit.increment_bonus!
        render json: { message: "AI生成回数が+1回されました", remaining: limit.remaining }
      end

      # GET /api/v1/cheers/generate_count 現在の生成残数を返すAPIの
      def generate_count
        kind = params[:kind] || "text_ai"
        limit = AiGenerationLimit.for(@current_user, kind)

        # 例: can_shareの定義（1日1回までシェアボーナス）
        can_share = (limit.bonus_count < 1)

        render json: { 
          remaining: limit.remaining, 
          can_share: can_share,
          max: limit.max_count, 
          count: limit.count, 
          bonus_count: limit.bonus_count 
        }
      end

      private

      def cheer_params
        params.require(:cheer).permit(
          :text, :cheer_type_id, :muscle_id, :pose_id,
          :cheer_mode, :image_url, :keyword
        )
      end
    end
  end
end
