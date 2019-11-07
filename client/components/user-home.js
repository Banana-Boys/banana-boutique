import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAddresses, deleteAddress} from '../store/addresses'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchAddresses()
  }

  handleClick(e) {}

  render() {
    const {name, email, phone, imageUrl} = this.props.user
    console.log('render user home')
    return (
      <div>
        <h3>Welcome, {name}</h3>
        <img src={imageUrl} />
        <h5>Email: {email}</h5>
        <h5>Phone #: {phone}</h5>
        <h5>Addresses: </h5>
        {this.props.addresses.map(address => {
          const {id, address1, address2, city, state, country, zip} = address
          return (
            <div key={id}>
              <p>{address1}</p>
              {address2 ? <p>{address2}</p> : null}
              <p>
                <span>{city}</span>, {state ? <span>{state},</span> : null}{' '}
                <span>{country}</span> {zip ? <span>{zip},</span> : null}
              </p>
              <Link to={`/addresses/${id}/edit`}>
                <button type="button">Edit Address</button>
              </Link>
              <button
                type="button"
                onClick={() => {
                  this.props.deleteAddress(id)
                }}
              >
                Delete Address
              </button>
            </div>
          )
        })}
        <Link to="/addresses/new">
          <button type="button">Add Address</button>
        </Link>
        <h5>Wishlists: </h5>
        <h5>Orders: </h5>
        <h5>Reviews: </h5>
        <Link to={`/users/${this.props.match.params.id}/edit`}>
          <button type="button">Edit Profile</button>
        </Link>
        <button type="button" onClick={this.handleClick}>
          Delete Profile
        </button>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({user, addresses}) => ({user, addresses})
const mapDispatch = {fetchAddresses, deleteAddress}

export default connect(mapState, mapDispatch)(UserHome)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
