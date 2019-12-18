import React from "react"

const EndGame = ({ score, submitScore }) => {

  return(
    <div className="end-game">
      <h2>End Game</h2>
      <form onSubmit={submitScore} className="end-game-form">
        <p><strong>{`Your score is: ${score}`}</strong></p>
        <div className="form-group mx-sm-3 mb-2">
          <input type="text" placeholder="Enter Your Name" className="form-control save-name" required />
        </div>
        <button className="btn btn-success mb-2" type="submit">Save</button>
      </form>
    </div>
  )

}

export default EndGame;
