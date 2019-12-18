import React, { Component } from 'react'

export default class Timer extends Component {
  render() {
    return (
      <div className="timer">
        <h1>Time Left:{this.props.timer}</h1>
      </div>
    )
  }
}