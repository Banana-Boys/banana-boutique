import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Search from './Search'
import UserHome from './UserHome'
import {Input, Button, Form, Item, Grid, Container} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div id="nav-container">
    <Link to="/home">
      <img
        src="https://nanas-image-store.s3.us-east-2.amazonaws.com/nana-logo.png"
        id="logo"
      />
    </Link>
    <nav>
      {isLoggedIn && (
        <a href="#" onClick={handleClick}>
          logout
        </a>
      )}
      {!isLoggedIn && <Link to="/login">login</Link>}{' '}
      {!isLoggedIn && <Link to="/signup">sign up</Link>}
      <Link to="/home">home</Link>
      <Link to="/products">products</Link>
    </nav>
    {/* <div>
        /* <Search />
      </div> */}
    <Container id="nav-profile">
      {isLoggedIn && (
        <Link to={`/users/${user.id}`}>
          <Button type="button">Profile</Button>
        </Link>
      )}
      <Link to="/cart">
        <Button type="button">Cart</Button>
      </Link>
    </Container>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
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
