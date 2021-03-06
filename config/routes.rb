Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations'
      }
  root to: 'pages#home'

  get 'users/:id', to: 'users#show', as: :user
  get 'restaurants/:id/meetings', to: 'restaurants#meetings', as: 'available_meetings'
  get 'users/:id/reviews', to: 'reviews#new', as: 'user_review'
  post 'users/:id/reviews', to: 'reviews#create'
  # get 'restaurants/map', to: 'restaurants#map'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :restaurants, only: [:index, :show, :new, :create]
  resources :meetings, only: [:index, :show, :create, :new, :destroy]
  resources :guests
  resources :reviews, only: [:new, :create]
  resources :chat_rooms, only: [ :show , :index] do
    resources :messages, only: [ :create ]
  end
end
