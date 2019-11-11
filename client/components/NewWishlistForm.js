/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import priceConvert from '../../utilFrontEnd/priceConvert'
import {fetchAddresses, fetchDistance} from '../store/addresses'
import {createWishlist} from '../store/singleWishlist'
import {states, countries} from '../../utilFrontEnd/address'
import {Button} from 'semantic-ui-react'

class NewWishlistForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      cart: this.props.cart || [],
      shippingTax: 0,
      shippingAddress: '',
      newShippingAddress: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        zip: ''
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.createWishlist = this.createWishlist.bind(this)
  }

  componentDidMount() {
    this.props.fetchAddresses()
  }

  //   componentWillReceiveProps(newProps) {
  //     if (newProps.user.id !== this.state.user.id) {
  //       this.props.fetchAddresses()
  //     }
  //     this.setState({cart: newProps.cart, user: newProps.user})
  //   }

  createWishlist(token, addresses) {
    this.props.createOrder(
      {
        user: this.state.user,
        cart: this.state.cart,
        shippingAddress: this.state.shippingAddress,
        shippingTax: this.state.shippingTax,
        token,
        addresses
      },
      this.props.history
    )
  }

  handleChange(e) {
    e.persist()
    if (e.target.name === 'shippingAddress') {
      this.setState({shippingAddress: e.target.value})
    } else if (e.target.name === 'name') {
      this.setState({name: e.target.value})
    } else {
      this.setState(prevState => ({
        newShippingAddress: {
          ...prevState.newShippingAddress,
          [e.target.name]: e.target.value
        }
      }))
    }
  }

  async handleSubmit(e) {
    e.preventDefault()
    if (e.target.id === 'shippingAddressForm') {
      let shippingAddress
      if (e.target.shippingAddress) {
        if (e.target.shippingAddress.value === 'new') {
          shippingAddress = this.state.newShippingAddress
        } else {
          shippingAddress = this.props.addresses.find(
            address => address.id === Number(e.target.shippingAddress.value)
          )
        }
      } else {
        shippingAddress = this.state.newShippingAddress
      }
      const distance = await this.props.fetchDistance(shippingAddress.zip)
      const shippingTax = Math.ceil(distance * 1) // 1 cent per mile
      this.setState({shippingAddress, shippingTax})
    }
  }

  render() {
    const cart = this.props.cart

    return (
      <div>
        {cart.map(item => {
          return (
            <div className="product" key={item.product.id}>
              <img src={item.product.imageUrl} />
              <h4>
                {item.product.name} - <em>quantity:</em> {item.quantity} -{' '}
                <em>price:</em> ${priceConvert(item.product.price)} x{' '}
                {item.quantity} = ${priceConvert(
                  item.product.price * item.quantity
                )}
              </h4>
            </div>
          )
        })}
        <h4>
          <em>Shipping tax:</em> {(this.state.shippingTax / 100).toFixed(2)}
        </h4>
        <hr />
        <h3>
          <em>Subtotal:</em> ${cart
            .reduce(
              (sum, item) => item.quantity * item.product.price / 100 + sum,
              this.state.shippingTax / 100
            )
            .toFixed(2)}
        </h3>

        <div>
          <label htmlFor="name">Wishlist Name:</label>
          <input type="text" name="name" onChange={this.handleChange} />
        </div>

        <div>
          {this.props.user.name ? <p>Name: {this.props.user.name}</p> : null}
          <p>
            Email: {this.props.user.email}{' '}
            <em>(confirmation will be sent to this email)</em>
          </p>
          {this.props.user.phone ? <p>Phone: {this.props.user.phone}</p> : null}
        </div>

        {typeof this.state.shippingAddress !== 'object' ? (
          <form id="shippingAddressForm" onSubmit={this.handleSubmit}>
            {' '}
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
                  <input
                    type="radio"
                    name="shippingAddress"
                    value={id}
                    onChange={this.handleChange}
                  />
                  <div>
                    <div>{address1}</div>
                    {address2 ? <div>{address2}</div> : null}
                    <div>
                      <span>{city}</span>,{' '}
                      {state ? <span>{state},</span> : null}{' '}
                      <span>{country}</span> <span>{zip}</span>
                    </div>
                  </div>
                </div>
              )
            })}
            <div>
              <input
                type="radio"
                name="shippingAddress"
                value="new"
                onChange={this.handleChange}
              />
              <div className="form-group">
                <label htmlFor="address1">Street Address:</label>
                <input
                  type="text"
                  name="address1"
                  onChange={this.handleChange}
                />
                {this.state.newShippingAddress.address1.length > 0 ? null : (
                  <div>Street address cannot be empty</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="address2">Apartment/Unit:</label>
                <input
                  type="text"
                  name="address2"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input type="text" name="city" onChange={this.handleChange} />
                {this.state.newShippingAddress.city.length > 0 ? null : (
                  <div>City cannot be empty</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="state">State:</label>
                <select name="state" onChange={this.handleChange}>
                  {states.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="country">Country:</label>
                <select name="country" onChange={this.handleChange}>
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {this.state.newShippingAddress.country.length > 0 ? null : (
                  <div>Please choose a country</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="zip">Zip Code:</label>
                <input type="text" name="zip" onChange={this.handleChange} />
                {this.state.newShippingAddress.zip.length > 0 ? null : (
                  <div>Zip code cannot be empty</div>
                )}
              </div>
            </div>
            <button type="submit" disabled={!this.state.shippingAddress.length}>
              Submit
            </button>
          </form>
        ) : (
          <div>
            <div>Shipping Address:</div>
            <p>{this.state.shippingAddress.address1}</p>
            {this.state.shippingAddress.address2 ? (
              <p>{this.state.shippingAddress.address2}</p>
            ) : null}
            <p>
              <span>{this.state.shippingAddress.city}</span>,{' '}
              {this.state.shippingAddress.state ? (
                <span>{this.state.shippingAddress.state},</span>
              ) : null}{' '}
              <span>{this.state.shippingAddress.country}</span>{' '}
              <span>{this.state.shippingAddress.zip}</span>
            </p>
          </div>
        )}
        {cart.length ? (
          <Button
            type="button"
            disabled={typeof this.state.shippingAddress !== 'object'}
            onClick={this.createWishlist}
          >
            Create Wishlist
          </Button>
        ) : (
          <Button type="button" disabled>
            Nothing in Wishlist
          </Button>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({cart, user, addresses}) => ({cart, user, addresses})
const mapDispatchToProps = {fetchAddresses, createWishlist, fetchDistance}

export default connect(mapStateToProps, mapDispatchToProps)(NewWishlistForm)
