# app/controllers/api/v1/cheers_controller.rb
module Api
  module V1
    class CheersController < ApplicationController
      # 認証ミドルウェアはApplicationControllerでinclude済み

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

      private

      def cheer_params
        params.require(:cheer).permit(:text, :cheer_type_id, :muscle_id, :pose_id, :cheer_mode, :image_url, :keyword)
      end
    end
  end
end
