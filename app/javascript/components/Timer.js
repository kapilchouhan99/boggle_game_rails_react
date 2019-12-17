import React, { Component } from 'react'

export default class Timer extends Component {
  render() {
    debugger
    return (
      <div>
        <h1>Time Remaining:{this.props.timer}</h1>
      </div>
    )
  }
}