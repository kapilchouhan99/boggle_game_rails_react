import React from "react"
import ScoreRow from './ScoreRow'
class HighScore extends React.Component {
  state = {
    scores: []
  }

  componentDidMount = () => {
    fetch("/boggle/highscores")
      .then(res => res.json())
      .then(highScores => {
        const renderedScores = this.createDivs(highScores.scores)
        this.setState({scores: renderedScores})
      })
  }


  createDivs = (highScores) => {
    return highScores.map((round, idx) => {
      return <ScoreRow key={idx} round={round} />
    })
  }


  render() {
    return (
      <div className="highscore-list" >
        <header className="highscore-title">High Scores</header>
        <ol className='highscore-ul'>
          {this.state.scores}
        </ol>
      </div>
    )
  }
}

export default HighScore