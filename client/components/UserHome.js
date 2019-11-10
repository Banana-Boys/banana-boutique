import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAddresses, deleteAddress} from '../store/addresses'
import {deleteUser} from '../store/user'
import {fetchUserReviews, destroyReview} from '../store/reviews'
import {fetchUserOrders, fetchAllOrders} from '../store/orders'
import Review from './Review'
import UserOrder from './UserOrder'
import AllOrders from './AllOrders'
import {Button} from 'semantic-ui-react'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchAddresses()
    await this.props.fetchUserReviews(this.props.match.params.id)
    await this.props.fetchUserOrders(this.props.match.params.id)
  }

  handleClick(e) {}

  render() {
    const {name, email, phone, imageUrl} = this.props.user
    const propsId = this.props.match.params.id
    return (
      <div id="user-home">
        <h3>Welcome, {name}</h3>
        {}

        {this.props.user.role === 'admin' ? (
          <Link to="/adminboard">
            <Button>Admin Board</Button>
          </Link>
        ) : (
          <div />
        )}
        <img id="" src={imageUrl} />
        <h5>Email: {email}</h5>
        <h5>Phone #: {phone}</h5>
        <h5>Your Addresses: </h5>
        {this.props.addresses.map(address => {
          const {id, address1, address2, city, state, country, zip} = address
          return (
            <div key={id}>
              <p>{address1}</p>
              {address2 ? <p>{address2}</p> : null}
              <p>
                <span>{city}</span>, {state ? <span>{state},</span> : null}{' '}
                <span>{country}</span> <span>{zip}</span>
              </p>
              <Link to={`/addresses/${id}/edit`}>
                <Button size="mini" type="button">
                  Edit Address
                </Button>
              </Link>
              <Button
                size="mini"
                type="button"
                onClick={() => {
                  this.props.deleteAddress(id)
                }}
              >
                Delete Address
              </Button>
            </div>
          )
        })}
        <Link to="/addresses/new">
          <Button size="mini" type="button">
            +Add Address
          </Button>
        </Link>
        {/* <h5>Wishlists: </h5> */}
        <h5>
          Your Orders:{' '}
          {this.props.orders.map(order => (
            <UserOrder key={order.id} order={order} />
          ))}
        </h5>

        <h5>
          Your Reviews:{' '}
          {this.props.reviews.map(rev => (
            <Review
              key={rev.id}
              destroyReview={this.props.destroyReview}
              review={rev}
              //fetchUser={this.props.fetchUser}
            />
          ))}
        </h5>

        <Link to={`/users/${this.props.match.params.id}/edit`}>
          <Button size="mini" type="button">
            Edit Profile
          </Button>
        </Link>

        <Button
          size="mini"
          type="button"
          onClick={() => {
            this.props.deleteUser(this.props.match.params.id)
          }}
        >
          Delete Profile
        </Button>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({user, addresses, reviews, orders}) => ({
  user,
  addresses,
  reviews,
  orders
})
const mapDispatch = {
  fetchAddresses,
  deleteAddress,
  deleteUser,
  fetchUserReviews,
  destroyReview,
  fetchUserOrders
}

export default connect(mapState, mapDispatch)(UserHome)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
