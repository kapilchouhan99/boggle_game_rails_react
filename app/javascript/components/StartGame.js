import React from "react"

const StartGame = ({ start, disabled }) => {

  return(
    <div className="start-button">
      <button type="button" onClick={start} className="btn btn-primary" disabled={disabled}>Start New Game</button>
    </div>
  )
}

export default StartGame
