import React from 'react'
import {Login, Signup} from '../auth-form'

const CheckoutLogin = props => {
  const user = props.user
  const handleUserOptions = props.handleUserOptions
  const handleSubmit = props.handleSubmit
  let {login, signup, continueAsGuest} = props.showUserOptions

  return (
    <div>
      {user.email ? (
        <div>
          {user.name ? <p>Name: {user.name}</p> : null}
          <p>
            Email: {user.email}{' '}
            <em>(confirmation will be sent to this email)</em>
          </p>
          {user.phone ? <p>Phone: {user.phone}</p> : null}
        </div>
      ) : (
        <div>
          <button type="button" name="login" onClick={handleUserOptions}>
            {login ? 'Hide' : 'Login'}
          </button>
          {login ? <Login /> : null}
          <button type="button" name="signup" onClick={handleUserOptions}>
            {signup ? 'Hide' : 'Signup'}
          </button>
          {signup ? <Signup /> : null}
          <button
            type="button"
            name="continueAsGuest"
            onClick={handleUserOptions}
          >
            {continueAsGuest ? 'Hide' : 'Continue as Guest'}
          </button>
          {continueAsGuest ? (
            <form id="guestEmailForm" onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" />
              <button type="submit">Submit</button>
            </form>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default CheckoutLogin
