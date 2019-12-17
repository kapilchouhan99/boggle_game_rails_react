Rails.application.routes.draw do
  root 'boggle#index'
  resources :boggle, only: [:index, :create]
  get '/boggle/check_word', to: 'boggle#check_word'

  get  '/boggle/start_game', to: 'boggle#start_game'
  get  '/boggle/highscores', to: 'boggle#highscores'
  post '/boggle/play_boggle', to: 'boggle#play_boggle'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
