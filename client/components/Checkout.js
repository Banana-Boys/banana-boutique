/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import priceConvert from '../../utilFrontEnd/priceConvert'
import {Login, Signup} from './auth-form'
import {fetchAddresses, fetchDistance} from '../store/addresses'
import {createOrder} from '../store/singleOrder'
import {states, countries} from '../../utilFrontEnd/address'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showUserOptions: {
        login: false,
        signup: false,
        continueAsGuest: false
      },
      cart: this.props.cart || [],
      shippingTax: 0,
      user: this.props.user || {},
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
    this.handleUserOptions = this.handleUserOptions.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.createOrder = this.createOrder.bind(this)
  }

  componentDidMount() {
    if (this.props.user.id) this.props.fetchAddresses()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.user.id !== this.state.user.id) {
      this.props.fetchAddresses()
    }
    this.setState({cart: newProps.cart, user: newProps.user})
  }

  createOrder() {
    this.props.createOrder({
      user: this.state.user,
      cart: this.state.cart,
      shippingAddress: this.state.shippingAddress,
      shippingTax: this.state.shippingTax
    })
  }

  handleUserOptions(e) {
    e.persist()
    if (this.state.showUserOptions[e.target.name]) {
      this.setState(prevState => {
        return {
          ...prevState,
          showUserOptions: {
            ...prevState.showUserOptions,
            [e.target.name]: false
          }
        }
      })
    } else {
      this.setState({
        showUserOptions: {login: false, signup: false, continueAsGuest: false}
      })
      this.setState(prevState => {
        return {
          ...prevState,
          showUserOptions: {...prevState.showUserOptions, [e.target.name]: true}
        }
      })
    }
  }

  handleChange(e) {
    e.persist()
    if (e.target.name === 'shippingAddress') {
      this.setState({shippingAddress: e.target.value})
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
    if (e.target.id === 'guestEmailForm') {
      this.setState({user: {email: e.target.email.value}})
    } else if (e.target.id === 'shippingAddressForm') {
      let shippingAddress
      if (e.target.shippingAddress) {
        if (e.target.shippingAddress.value === 'new') {
          shippingAddress = this.state.newShippingAddress
          // this.setState(prevState => ({
          //   shippingAddress: prevState.newShippingAddress
          // }))
        } else {
          shippingAddress = this.props.addresses.find(
            address => address.id === Number(e.target.shippingAddress.value)
          )
          // this.setState({
          //   shippingAddress: this.props.addresses.find(
          //     address => address.id === Number(e.target.shippingAddress.value)
          //   )
          // })
        }
      } else {
        shippingAddress = this.state.newShippingAddress
        // this.setState(prevState => ({
        //   shippingAddress: prevState.newShippingAddress
        // }))
      }
      const distance = await this.props.fetchDistance(shippingAddress.zip)
      console.log(distance)
      const shippingTax = distance * 1 // 1 cent per mile
      this.setState({shippingAddress, shippingTax})
    }
  }

  render() {
    const cart = this.props.cart
    let {login, signup, continueAsGuest} = this.state.showUserOptions

    return (
      <div id="checkout">
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

        {this.state.user.email ? (
          <div>
            {this.state.user.name ? <p>Name: {this.state.user.name}</p> : null}
            <p>
              Email: {this.state.user.email}{' '}
              <em>(confirmation will be sent to this email)</em>
            </p>
            {this.state.user.phone ? (
              <p>Phone: {this.state.user.phone}</p>
            ) : null}
          </div>
        ) : (
          <div>
            <button type="button" name="login" onClick={this.handleUserOptions}>
              {login ? 'Hide' : 'Login'}
            </button>
            {login ? <Login /> : null}
            <button
              type="button"
              name="signup"
              onClick={this.handleUserOptions}
            >
              {signup ? 'Hide' : 'Signup'}
            </button>
            {signup ? <Signup /> : null}
            <button
              type="button"
              name="continueAsGuest"
              onClick={this.handleUserOptions}
            >
              {continueAsGuest ? 'Hide' : 'Continue as Guest'}
            </button>
            {continueAsGuest ? (
              <form id="guestEmailForm" onSubmit={this.handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" />
                <button type="submit">Submit</button>
              </form>
            ) : null}
          </div>
        )}

        {typeof this.state.shippingAddress !== 'object' ? (
          this.state.user.id ? (
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
              <button
                type="submit"
                disabled={!this.state.shippingAddress.length}
              >
                Submit
              </button>
            </form>
          ) : (
            <form id="shippingAddressForm" onSubmit={this.handleSubmit}>
              <div>
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
              <button type="submit">Submit</button>
            </form>
          )
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
        <button
          type="button"
          disabled={
            typeof this.state.shippingAddress !== 'object' ||
            !this.state.user.email
          }
          onClick={this.createOrder}
        >
          Process Order
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({cart, user, addresses}) => ({cart, user, addresses})
const mapDispatchToProps = {fetchAddresses, createOrder, fetchDistance}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
