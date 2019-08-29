import React from 'react'

const BeerButton = props => (
  <button
    disabled={!props.state}
    className="ui animated button"
    tabIndex="0"
    onClick={() => props.handleSubmit(props.name)}
  >
    <div className="visible content">{props.name}</div>
    <div className="hidden content">
      <i className="beer icon" />
    </div>
  </button>
)

export default BeerButton
