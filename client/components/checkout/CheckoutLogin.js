import React from 'react'
import {Login, Signup} from '../auth-form'
import {Button} from 'semantic-ui-react'
import '../../styles/checkoutlogin.scss'

const CheckoutLogin = props => {
  const handleUserOptions = props.handleUserOptions
  const handleSubmit = props.handleSubmit
  let {login, signup, continueAsGuest} = props.showUserOptions

  return (
    <div id="checkout-login">
      <Button type="button" name="login" onClick={handleUserOptions}>
        {login ? 'Hide' : 'Login'}
      </Button>
      {login ? <Login /> : null}
      <Button type="button" name="signup" onClick={handleUserOptions}>
        {signup ? 'Hide' : 'Signup'}
      </Button>
      {signup ? <Signup /> : null}
      <Button type="button" name="continueAsGuest" onClick={handleUserOptions}>
        {continueAsGuest ? 'Hide' : 'Continue as Guest'}
      </Button>
      {continueAsGuest ? (
        <form id="guestEmailForm" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" />
          <Button type="submit">Submit</Button>
        </form>
      ) : null}
    </div>
  )
}

export default CheckoutLogin
