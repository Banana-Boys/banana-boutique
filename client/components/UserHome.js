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
import {
  Button,
  Container,
  Item,
  Image,
  Accordion,
  Table,
  Dropdown,
  TableBody,
  Header,
  Comment,
  Label
} from 'semantic-ui-react'
import {Login} from './auth-form'
import '../styles/userhome.scss'

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
        <Container id="userhomeitem">
          <Item.Group>
            <Item>
              {!imageUrl ? (
                <img
                  id="userhomeprofileimage"
                  src="http://simpleicon.com/wp-content/uploads/user1.svg"
                />
              ) : (
                <img id="userhomeprofileimage" src={imageUrl} />
              )}

              <Item.Content id="userhomeitemcontent">
                <Item.Description>
                  <div>
                    {isUser ? (
                      <h5 className="username">Name: {name}</h5>
                    ) : (
                      <div>
                        <div>
                          <h5 className="username">
                            You are not the correct user
                          </h5>
                        </div>
                        <Login />
                      </div>
                    )}
                  </div>
                  <div id="userhomeitemcontent">
                    <h5>Email: {email}</h5>
                    <h5>Phone #: {phone}</h5>

                    <div id="addressinfoholder">
                      <div
                        role="listbox"
                        aria-expanded="false"
                        className="dropdown"
                        tabIndex="0"
                      >
                        <div className="drp">
                          <h5 id="dropdowntext">
                            Addresses:{' '}
                            {/* <i aria-hidden="true" className="dropdown icon" /> */}
                          </h5>
                        </div>

                        <div className="dropdown-content">
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
                              <Container key={id}>
                                <Table>
                                  <Table.Body>
                                    <Table.Row id="tablerowaddress">
                                      <div id="addresstablerow">
                                        <p>{address1}</p>
                                        {address2 ? <p>{address2}</p> : null}
                                        <p>
                                          <span>{city}</span>,{' '}
                                          {state ? <span>{state},</span> : null}{' '}
                                          <span>{country}</span>{' '}
                                          <span>{zip}</span>
                                        </p>
                                      </div>
                                      <Table.Cell floated="left">
                                        <div id="addressbuttonstablerow">
                                          <div className="buttonpositioningaddress">
                                            <Link to={`/addresses/${id}/edit`}>
                                              <Button
                                                size="mini"
                                                type="button"
                                                color="blue"
                                              >
                                                Edit Address
                                              </Button>
                                            </Link>
                                          </div>
                                          <div className="buttonpositioningaddress">
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
                                        </div>
                                      </Table.Cell>
                                    </Table.Row>
                                  </Table.Body>
                                </Table>
                              </Container>
                            )
                          })}
                        </div>
                      </div>
                      <Link to="/addresses/new">
                        <Button size="mini" type="button" color="black">
                          +Add Address
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>

          <Container>
            <Container className="userhomedetailholder">
              <Comment.Group>
                <Header as="h3" dividing>
                  YOUR ORDERS
                </Header>
                <Item.Group>
                  {this.props.orders.map(order => (
                    <UserOrder key={order.id} order={order} />
                  ))}
                </Item.Group>
              </Comment.Group>
            </Container>

            <Container className="userhomedetailholder">
              <Comment.Group>
                <Header as="h3" dividing>
                  YOUR REVIEWS
                </Header>
                {this.props.reviews.map(rev => (
                  <div id="userreviewuserprofilepage" key={rev.id}>
                    <div id="userreview">
                      <Review
                        destroyReview={this.props.destroyReview}
                        review={rev}
                      />
                    </div>
                    {/* <div id="userreviewproduct">{<Label />}</div> */}
                  </div>
                ))}
              </Comment.Group>
            </Container>
          </Container>

          <Container id="nonozone">
            <Comment.Group>
              <Header as="h3" dividing>
                MISC
              </Header>
            </Comment.Group>
            <Container id="userhomebuttons">
              <Button
                size="mini"
                type="button"
                onClick={() => {
                  this.props.history.push('/passwordReset')
                }}
              >
                Reset Password
              </Button>
              <Link to={`/users/${this.props.match.params.id}/edit`}>
                <Button size="mini" type="button" color="blue">
                  Edit Profile
                </Button>
              </Link>
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
          </Container>
        </Container>
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
