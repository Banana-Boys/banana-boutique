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
    {console.log('user', user)}
    <Link to="/home">
      <img
        src="https://nanas-image-store.s3.us-east-2.amazonaws.com/nana-logo.png"
        id="logo"
      />
    </Link>
    <nav>
      {isLoggedIn && (
        <a href="#" onClick={handleClick}>
          <h2 className="navbartitle">logout</h2>
        </a>
      )}
      {!isLoggedIn && (
        <Link to="/login">
          <h2 className="navbartitle">login</h2>
        </Link>
      )}{' '}
      {!isLoggedIn && (
        <Link to="/signup">
          <h2 className="navbartitle">sign up</h2>
        </Link>
      )}
      <Link to="/home">
        <h2 className="navbartitle">home</h2>
      </Link>
      <Link to="/products">
        <h2 className="navbartitle">products</h2>
      </Link>
    </nav>
    {/* <div>
        /* <Search />
      </div> */}
    <Container id="nav-profile">
      {isLoggedIn && (
        <Link to={`/users/${user.id}`}>
          {!user.imageUrl ? (
            <img
              id="user-icon"
              src="http://simpleicon.com/wp-content/uploads/user1.svg"
            />
          ) : (
            <div>
              <img id="user-icon" src={user.imageUrl} />
            </div>
          )}
        </Link>
      )}
      <Link to="/cart">
        <img
          id="cart-icon"
          src="https://www.svgrepo.com/show/10154/shopping-cart-empty-side-view.svg"
        />
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
