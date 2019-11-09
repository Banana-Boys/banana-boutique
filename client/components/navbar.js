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
    <img src="/images/nanas-600.jpg" id="logo" />
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">home</Link>
          <a href="#" onClick={handleClick}>
            logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/products">products</Link>
          <Link to="/login">login</Link>
          <Link to="/signup">sign up</Link>
        </div>
      )}
      <div>
        <Search />
      </div>
      <Container>
        <Link to={`/users/${user.id}`}>
          <Button type="button">Profile</Button>
        </Link>
      </Container>
    </nav>
    <hr />
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
