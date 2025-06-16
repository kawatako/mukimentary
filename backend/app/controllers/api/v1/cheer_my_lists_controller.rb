# app/controllers/api/v1/cheer_my_lists_controller.rb
module Api
  module V1
    class CheerMyListsController < ApplicationController
      before_action :set_cheer_my_list, only: [:destroy]

      # GET /api/v1/cheer_my_lists
      def index
        lists = current_user.cheer_my_lists.order(created_at: :desc)
        render json: lists
      end

      # POST /api/v1/cheer_my_lists
      def create
        list = current_user.cheer_my_lists.new(name: params[:name])
        if list.save
          render json: list, status: :created
        else
          render json: { error: list.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH /api/v1/cheer_my_lists
      def update
        list = current_user.cheer_my_lists.find(params[:id])
        if list.update(name: params[:name])
          render json: list
        else
          render json: { error: "更新失敗" }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/cheer_my_lists/:id
      def destroy
        @cheer_my_list.destroy
        head :no_content
      end

      private

      def set_cheer_my_list
        @cheer_my_list = current_user.cheer_my_lists.find(params[:id])
      end
    end
  end
end
