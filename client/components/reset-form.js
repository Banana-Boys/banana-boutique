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
    <form
      id="form-page"
      onSubmit={event => handleSubmit(event, props.user, props.history)}
      name={name}
    >
      <div>
        <label htmlFor="oldPassword">
          <small>Old Password:</small>
        </label>
        <input name="oldPassword" type="password" />
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
  )
}

const mapState = state => ({user: state.user})

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, user, history) {
      evt.preventDefault()
      const password = evt.target.password.value
      const oldPassword = evt.target.oldPassword.value
      dispatch(resetPassword(user.id, oldPassword, password, history))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ResetForm))
