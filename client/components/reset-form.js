import React from 'react'
import {connect} from 'react-redux'
import {resetPassword} from '../store/user'
import {withRouter} from 'react-router-dom'

/**
 * COMPONENT
 */
const ResetForm = props => {
  const {handleSubmit} = props
  const displayName = 'Reset Password'
  const error = props.user.error
  return (
    <div id="account-form">
      <form
        onSubmit={event => handleSubmit(event, props.user, props.history)}
        name={name}
      >
        <div>
          <label htmlFor="password">
            <small>New Password:</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapState = state => ({user: state.user})

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, user, history) {
      evt.preventDefault()
      const password = evt.target.password.value
      dispatch(resetPassword(user.id, password, history))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ResetForm))
