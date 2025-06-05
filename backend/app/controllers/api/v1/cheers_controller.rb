# backend/app/controllers/api/v1/cheers_controller.rb
module Api
  module V1
    class CheersController < ApplicationController
      # 認証ミドルウェアはApplicationControllerでinclude済み
      
      #開発中は「回数取得系API」だけ認証スキップ
      skip_before_action :authenticate_with_jwt!, only: [:generate_count, :share_bonus]

      # GET /api/v1/cheers
      def index
        cheers = @current_user.cheers.order(created_at: :desc)
        render json: cheers.as_json(include: [:cheer_type, :muscle, :pose])
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
          # 回数制限チェック
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
        # 制限OKならカウントアップ
        limit.increment_count!
        # パラメータ検証（空欄は空文字に）
        %i[cheer_type muscle pose keyword].each do |param|
          params[param] ||= ""
        end

        # サービス層でAI生成
        cheer_text = CheerGeneratorService.generate_from_text(
          cheer_type: params[:cheer_type],
          muscle: params[:muscle],
          pose: params[:pose],
          keyword: params[:keyword]
        )

        render json: { result: cheer_text }
      rescue => e
      render json: { error: "1日の利用制限を超えました。サービスをシェアして利用回数を追加できます。" }, status: :forbidden
      end

      # POST /api/v1/cheers/generate_by_image
      # 画像＋テキスト入力から掛け声生成
      def generate_by_image
          # 回数制限チェック
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
        limit.increment_count!
        %i[cheer_type muscle pose keyword].each do |param|
          params[param] ||= ""
        end
        image_url = params[:image_url]
        return render json: { error: "画像URLがありません" }, status: :unprocessable_entity if image_url.blank?

        cheer_text = CheerGeneratorService.generate_from_image(
          image_url: image_url,
          cheer_type: params[:cheer_type],
          muscle: params[:muscle],
          pose: params[:pose],
          keyword: params[:keyword]
        )

        render json: { result: cheer_text }
      rescue => e
      render json: { error: "1日の利用制限を超えました。サービスをシェアして利用回数を追加できます。" }, status: :forbidden
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
