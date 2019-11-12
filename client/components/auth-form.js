import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {withRouter} from 'react-router-dom'

import '../styles/auth-form.scss'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="account-form">
      <div id="auth-form-logo">
        <img
          src="https://nanas-image-store.s3.us-east-2.amazonaws.com/animation-lux.gif"
          alt="Nanas sysmbol"
          height="225"
          width="400"
          id="logo-image"
        />
      </div>
      <div id="form-container">
        <form onSubmit={handleSubmit} name={name}>
          <div id="nana-login-signup-container">
            <div id="input-fields">
              <div>
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input name="email" type="text" />
              </div>
              <div>
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" />
              </div>
            </div>
            <div>
              <button type="submit" id="nana-login-button">
                <img
                  src="https://nanas-image-store.s3.us-east-2.amazonaws.com/nana-symbol.jpg"
                  alt="Nanas sysmbol"
                  height="24"
                  width="24"
                />
                {displayName}{' '}
              </button>
            </div>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">
          {' '}
          <img
            src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"
            height="46"
            width="191"
          />
        </a>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Sign in with Nana account',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm))
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm))

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
