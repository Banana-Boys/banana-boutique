import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Categories from './Categories'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name, email, phone, imageUrl} = props

  return (
    <div>
      <h3>Welcome, {name}</h3>
      <img src={imageUrl} />
      <h5>Email: {email}</h5>
      <h5>Phone #: {phone}</h5>
      <h5>Phone #: {phone}</h5>
      <h5>Billing Address: </h5>
      <h5>Shipping Address: </h5>
      <h5>Wishlists: </h5>
      <h5>Orders: </h5>
      <h5>Reviews: </h5>
      <div>
        <div>
          <input
            type="text"
            className="input"
            id="search"
            placeholder="Search..."
          />
          <button type="submit" className="button">
            Search{' '}
          </button>
        </div>
        <div>
          <Categories />
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
