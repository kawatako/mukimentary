# app/controllers/api/v1/cheers_controller.rb
module Api
  module V1
    class CheersController < ApplicationController
      def index
        render json: { message: "JWT認証OK!cheers一覧（仮）" }
      end
    end
  end
end
