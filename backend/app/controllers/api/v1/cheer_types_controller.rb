# backend/app/controllers/api/v1/cheer_types_controller.rb
module Api
  module V1
    class CheerTypesController < ApplicationController
      skip_before_action :authenticate_with_jwt!

      def index
        cheer_types = CheerType.where(active: true).order(:position)
        render json: cheer_types.as_json(only: [:id, :name, :description, :position])
      end
    end
  end
end