Rails.application.routes.draw do
  scope 'api' do
  end

  resources :healthcheck
  get 'healthcheck' => 'healthcheck#index'
end
