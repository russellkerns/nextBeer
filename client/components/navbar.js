import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const textColor = {
  color: 'white'
}
const Navbar = ({handleClick, isLoggedIn}) => (
  <div style={{backgroundColor: 'black'}}>
    <h1 style={{color: 'white', padding: '.75em 0 0 2em'}}>NEXT BEER</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <Link style={textColor} to="/home">
            Home
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div style={{paddingLeft: '2.75em'}}>
          <Link style={textColor} to="/">
            Home
          </Link>
          <Link style={textColor} to="/login">
            Login
          </Link>
          <Link style={textColor} to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
