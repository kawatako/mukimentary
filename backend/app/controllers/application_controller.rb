# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  include JwtAuthenticatable

  # どこでも current_user が使えるようにする
  def current_user
    @current_user
  end
end
