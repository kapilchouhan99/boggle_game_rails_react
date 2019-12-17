import React from "react"
import PropTypes from "prop-types"
class List extends React.Component {
  render () {
    var words = this.props.words.map((word, i) => {
      return (
        <div key={i}>
          <li>{word}</li>
        </div>
      );
    });

    return (
      <div className="word-list" >
        <header className="list-title">My Words</header>
        <ul className="word">{words}</ul>
      </div>
    )
  }
}

export default List
