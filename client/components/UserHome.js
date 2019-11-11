import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAddresses, deleteAddress} from '../store/addresses'
import {deleteUser} from '../store/user'
import {fetchUserReviews, destroyReview} from '../store/reviews'
import {fetchUserOrders} from '../store/orders'
import Review from './Review'
import UserOrder from './UserOrder'
import AllOrders from './AllOrders'
import {Button, Container, Item, Image} from 'semantic-ui-react'
import {Login} from './auth-form'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    if (this.props.user.id) this.props.fetchAddresses()
    if (this.props.user.id)
      this.props.fetchUserReviews(this.props.match.params.id)
    if (this.props.user.id)
      this.props.fetchUserOrders(this.props.match.params.id)
  }

  handleClick(e) {}

  render() {
    const {id, name, email, phone, imageUrl, role} = this.props.user
    const isUser = id === Number(this.props.match.params.id) || role === 'admin'
    const propsId = this.props.match.params.id
    return (
      <Container id="user-home">
        <div id="userhomewelcomname">
          {isUser ? (
            <h1>Welcome, {name}</h1>
          ) : (
            <div>
              <div>
                <h1>You are not the correct user</h1>
              </div>
              <Login />
            </div>
          )}
        </div>
        <Item.Group>
          <Item id="user-home-itemgroup">
            {!imageUrl ? (
              <img
                id="userhomeprofileimage"
                src="http://simpleicon.com/wp-content/uploads/user1.svg"
              />
            ) : (
              <Item.Image id="userhomeprofileimage" src={imageUrl} />
            )}

            <Item.Content id="userhomeitemcontent">
              <Item.Description>
                <div id="userhomeitemcontent">
                  {this.props.user.role === 'admin' ? (
                    <Link to="/adminboard">
                      <Button>Admin Board</Button>
                    </Link>
                  ) : (
                    <div />
                  )}
                  <h5>Email: {email}</h5>
                  <h5>Phone #: {phone}</h5>
                  <h5>Your Addresses: </h5>
                  {this.props.addresses.map(address => {
                    const {
                      id,
                      address1,
                      address2,
                      city,
                      state,
                      country,
                      zip
                    } = address
                    return (
                      <div key={id}>
                        <p>{address1}</p>
                        {address2 ? <p>{address2}</p> : null}
                        <p>
                          <span>{city}</span>,{' '}
                          {state ? <span>{state},</span> : null}{' '}
                          <span>{country}</span> <span>{zip}</span>
                        </p>
                        <Link to="/addresses/new">
                          <Button size="mini" type="button" color="olive">
                            +Add Address
                          </Button>
                        </Link>
                        <Link to={`/addresses/${id}/edit`}>
                          <Button size="mini" type="button" color="blue">
                            Edit Address
                          </Button>
                        </Link>
                        <Button
                          size="mini"
                          type="button"
                          color="red"
                          onClick={() => {
                            this.props.deleteAddress(id)
                          }}
                        >
                          Delete Address
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>

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
          <Button size="mini" type="button" color="blue">
            Edit Profile
          </Button>
        </Link>
        <Button
          size="mini"
          type="button"
          onClick={() => {
            this.props.history.push('/passwordReset')
          }}
        >
          Reset Password
        </Button>
        <Button
          size="mini"
          type="button"
          color="red"
          onClick={() => {
            this.props.deleteUser(this.props.match.params.id)
          }}
        >
          Delete Profile
        </Button>
      </Container>
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
