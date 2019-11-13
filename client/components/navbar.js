/* eslint-disable complexity */
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'
import {Container} from 'semantic-ui-react'
import Search from './Search'
import '../styles/navbar.scss'

const Navbar = props => {
  const {handleClick, isLoggedIn, user, location} = props
  return (
    <div id="nav-container">
      <Link to="/">
        <img
          src="https://nanas-image-store.s3.us-east-2.amazonaws.com/nana-logo.png"
          id="logo"
        />
      </Link>
      <nav>
        <Link to="/products">
          <h2 className="navbartitle">products</h2>
        </Link>
      </nav>
      {location.pathname === '/login' || location.pathname === '/signup' ? (
        <div style={{width: '60%'}} />
      ) : (
        <Search />
      )}
      <nav>
        {user.role === 'admin' ? (
          <Link to="/adminboard">
            <h2 className="navbartitle">admin</h2>
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
        <div id="nav-profile">
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
        </div>
      </nav>
    </div>
  )
}
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
