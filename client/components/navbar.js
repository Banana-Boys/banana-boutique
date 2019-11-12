import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'
import UserHome from './UserHome'
import {Input, Button, Form, Item, Grid, Container} from 'semantic-ui-react'
import Search from './Search'
import '../styles/navbar.scss'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div id="nav-container">
    <Link to="/">
      <img
        src="https://nanas-image-store.s3.us-east-2.amazonaws.com/nana-logo.png"
        id="logo"
      />
    </Link>
    <Search />
    <nav>
      <Link to="/products">
        <h2 className="navbartitle">products</h2>
      </Link>
      {user.role === 'admin' ? (
        <Link to="/adminboard">
          <h2 className="navbartitle">admin board</h2>
        </Link>
      ) : null}
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
      {/* <Link to="/home">
        <h2 className="navbartitle">home</h2>
      </Link> */}
    </nav>
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

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
