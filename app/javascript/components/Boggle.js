import React from "react";
import Board from './Board';
import CheckWord from './CheckWord';
import List from './List';
import StartGame from './StartGame';
import Score from './Score';
import EndGame from './EndGame'
import HighScore from './HighScore'
import Timer from './Timer'

class Boggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      letters: "",
      isGameStarted: false,
      isGameEnded: false,
      timer: 0,
      score: 0,
      showPopup: false
    };
  }

  togglePopup = () => {  
    this.setState({ showPopup: !this.state.showPopup });  
  }  

  startGame = () => {
    fetch('/boggle/start_game').
      then((response) => response.json()).
      then(data => {
        this.setState({
          letters: data.letters,
          isGameEnded: false,
          isGameStarted: true,
          timer: 60,
          words: [],
          score: 0  
        }, () =>  {
        document.getElementById("check-word-input").focus()
        this.createTimerInterval()
      })
      })
  }

  componentWillUnmount = () => {
    this.removeTimerInterval()
  }

  createTimerInterval = () => {
    var intervalId = setInterval(this.timer, 1000);
    this.setState({intervalId: intervalId});
  }
  
  handleWord = (word) => {
    if (!this.checkWordLength(word)) return false
    if (!this.checkDuplicateWord(word)) return false
    if (!this.checkWordExists(word)) return false
  }

  checkDuplicateWord = (word) => {
    return (this.state.words.includes(word) ? false : true)
  }

  checkWordLength = (word) => {
    return (word.length >= 4) ? true : false
  }

  checkWordExists = (word) => {
    fetch('/boggle/check_word?word='+ word).
      then((response) => response.json()).
      then(data => {
        if (data.response) {
          this.addWord(word)
        }
        else{
          alert('Invalid ' + word);
        } 
      })
  }

  addWord = (word) => {
    const newWordArray = [word, ...this.state.words]
    const newScore = this.scoreWords(newWordArray)
    this.setState({words: newWordArray, score: newScore})
  }

  scoreWords  = (wordArray) => {
    return wordArray.reduce((score, currentWord) => {
      return score += (currentWord.length)
    }, 0)
  }

  submitScore = (event) => {
    const name = event.target.elements[0].value
    const data = {}
    data.score = this.state.score
    data.name = name
    fetch("/boggle", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  removeTimerInterval = () => {
    clearInterval(this.state.intervalId);
  }

  timer = () => {
    if (this.state.timer > 0) {
      this.setState({ timer: this.state.timer -1 });
    } else {
      this.endGame()
    }
  }

  endGame = () => {
    clearInterval(this.state.intervalId)
    this.setState({ 
      isGameStarted: false, 
      gameHasEnded: true,
      showPopup: !this.state.showPopup 
    })
  }

  render () {
    return (
      <div>
        <h1>Welcome to Boggel game</h1>
        {this.state.isGameStarted ? <Timer timer={this.state.timer} /> : null}
        {this.state.isGameStarted ? <button className="btn btn-primary" onClick={this.togglePopup}>End Game</button> : <StartGame start={this.startGame} disabled={this.state.showPopup} />}
        {this.state.isGameStarted ? <Board letters={this.state.letters} /> : null}
        <CheckWord handleWord={this.handleWord} letters={this.state.letters} disabled={this.state.showPopup} />
        <List words={this.state.words} />
        <Score score={this.state.score} />
        {this.state.showPopup ? <EndGame score={this.state.score} submitScore={this.submitScore} /> : null }
        <HighScore />
      </div>
    );
  }
}

export default Boggle;