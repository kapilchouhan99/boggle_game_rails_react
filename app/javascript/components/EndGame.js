import React from "react"

const EndGame = ({ score, submitScore }) => {

  return(
    <div className="end-game">
      <h2>End Game</h2>
      <form onSubmit={submitScore} className="end-game-form">
        <p>{`Your score is: ${score}`}</p>
        <input type="text" placeholder="Enter Your Name" />
        <button type="submit">Save</button>
      </form>
    </div>
  )

}

export default EndGame;
