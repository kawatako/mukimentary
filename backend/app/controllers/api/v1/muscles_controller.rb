# backend/app/controllers/api/v1/muscles_controller.rb

module Api
  module V1
    class MusclesController < ApplicationController
      skip_before_action :authenticate_with_jwt!

      def index
        muscles = Muscle.where(active: true).order(:position)
        render json: muscles.as_json(only: [:id, :name, :description, :position])
      end
    end
  end
end