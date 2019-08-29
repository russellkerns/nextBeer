/* eslint-disable react/button-has-type */
import React, {Component} from 'react'
import StateDropdown from './StateDropdown'
import BeerButton from './BeerButton'
import {getNextBeerThunk} from '../store/beers'
import {connect} from 'react-redux'

const beerList = [
  'Blue Moon Belgian White',
  'Budweiser',
  'Guinness Draught',
  'Stone IPA'
]

class GuestHome extends Component {
  constructor() {
    super()
    this.state = {
      state: ''
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSelect(evt) {
    this.setState({
      state: evt.target.value
    })
  }

  handleSubmit(name) {
    const query = {
      name,
      state: this.state.state
    }
    this.props.getNextBeerThunk(query)
    this.props.history.push('/nextBeers')
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="ui center aligned icon header">
          <i className="beer icon" />
          Let us help you find your next beer
        </h1>
        <h2 style={{textAlign: 'center', margin: '1.5em'}}>
          First, select your State
        </h2>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <StateDropdown handleSelect={this.handleSelect} />
        </div>
        <h3 style={{textAlign: 'center', margin: '1.5em'}}>
          Next, select one of the following beers you would drink
        </h3>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {beerList.map((beer, idx) => (
            <BeerButton
              key={idx}
              handleSubmit={this.handleSubmit}
              name={beer}
              state={this.state.state}
            />
          ))}
        </div>
        <h3 style={{textAlign: 'center', marginTop: '3em'}}>
          Sign up to track your beer selections
        </h3>
      </React.Fragment>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    getNextBeerThunk: query => dispatch(getNextBeerThunk(query))
  }
}

export default connect(null, mapDispatch)(GuestHome)
