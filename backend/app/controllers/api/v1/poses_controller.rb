# backend/app/controllers/api/v1/poses_controller.rb
module Api
  module V1
    class PosesController < ApplicationController
      skip_before_action :authenticate_with_jwt!

      def index
        poses = Pose.where(active: true).order(:position)
        render json: poses.as_json(only: [:id, :name, :description, :position])
      end
    end
  end
end