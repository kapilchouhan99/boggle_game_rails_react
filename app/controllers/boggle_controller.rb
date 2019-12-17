class BoggleController < ApplicationController
  def index
  end

  def create
    Score.create!(name: params[:name], score: params[:score])
  end

  def check_word
    @response = DICTIONARY.include?(params[:word])
    respond_to do |format|
      format.json  { render json: { response: @response } }
    end
  end

  def start_game
    characters = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"
    letters = characters.split("").sample(16).join("")
    render json: { letters: letters }
  end

  def highscores
    scores = Score.order("score DESC")
    render json: { scores: scores }
  end

  def play_boggle
    player_name = params[:player_name]
    word = params[:word]
    boggle = JSON.parse(params[:boggle])
    boggle_obj = Boggle.new({ boggle: boggle })
    result = boggle_obj.check_word(word)
    Score.create!(player_name: player_name, score: word.length, word: word)
    if result.present?
      render json: { response: { result: result, score: word.length } , status: "success" }
    else
      render json: { response: { result: result, score: "" } , status: "success" }
    end
  end
end
