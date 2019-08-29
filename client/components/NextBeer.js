import React, {Component} from 'react'
import {connect} from 'react-redux'

class NextBeer extends Component {
  constructor() {
    super()
    this.state = {isLoading: true}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.beers !== this.props.beers) {
      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div style={{height: '25vh'}} className="ui segment">
          <div className="ui active dimmer">
            <div className="ui text loader">Loading</div>
          </div>
          <p />
        </div>
      )
    }
    return (
      <div className="ui center aligned text container">
        <h1>Your Next Beers!</h1>
        {this.props.beers.map((beer, idx) => (
          <div
            key={idx}
            style={{
              margin: '1.5em',
              borderBottom: 'solid black',
              width: '20em'
            }}
            className="ui center aligned text container"
          >
            <p>
              <strong>Beer Name:</strong> {beer.beer}
            </p>
            <p>
              <strong>Brewery:</strong> {beer.brewery}
            </p>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    beers: state.beerReducer
  }
}

export default connect(mapState)(NextBeer)
