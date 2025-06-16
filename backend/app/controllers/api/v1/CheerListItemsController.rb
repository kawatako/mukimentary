# app/controllers/api/v1/cheer_list_items_controller.rb
module Api
  module V1
    class CheerListItemsController < ApplicationController
      before_action :set_cheer_my_list

      # GET /api/v1/cheer_my_lists/:cheer_my_list_id/items
      def index
        items = @cheer_my_list.cheer_list_items.includes(:cheer).order(:position)
        render json: items.as_json(include: :cheer)
      end

      # POST /api/v1/cheer_my_lists/:cheer_my_list_id/items
      def create
        item = @cheer_my_list.cheer_list_items.new(cheer_id: params[:cheer_id])
        if item.save
          render json: item, status: :created
        else
          render json: { error: item.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/cheer_my_lists/:cheer_my_list_id/items/:id
      def destroy
        item = @cheer_my_list.cheer_list_items.find(params[:id])
        item.destroy
        head :no_content
      end

      private

      def set_cheer_my_list
        @cheer_my_list = current_user.cheer_my_lists.find(params[:cheer_my_list_id])
      end
    end
  end
end
