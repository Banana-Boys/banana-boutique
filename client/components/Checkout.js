/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'

import {fetchAddresses, fetchDistance} from '../store/addresses'
import {createOrder} from '../store/singleOrder'

import StripeCheckout from 'react-stripe-checkout'
import {Button} from 'semantic-ui-react'

import CheckoutLogin from './checkout/CheckoutLogin'
import ShippingInfo from './checkout/ShippingInfo'
import CartReview from './checkout/CartReview'
class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formOnDisplay: this.props.user.id ? 1 : 0,
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
    this.setState({
      cart: newProps.cart,
      user: newProps.user,
      formOnDisplay: 1
    })
  }

  createOrder(token, addresses) {
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
      this.setState({user: {email: e.target.email.value}, formOnDisplay: 1})
    } else if (e.target.id === 'shippingAddressForm') {
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
      this.setState({shippingAddress, shippingTax, formOnDisplay: 2})
    }
  }

  render() {
    const cart = this.props.cart
    let {showUserOptions, formOnDisplay} = this.state

    return (
      <div id="checkout">
        {/* Ask for Login */}

        {formOnDisplay === 0 && (
          <CheckoutLogin
            showUserOptions={showUserOptions}
            user={this.state.user}
            handleUserOptions={this.handleUserOptions}
            handleSubmit={this.handleSubmit}
          />
        )}

        {/* Get Shipping Information */}
        {formOnDisplay === 1 && (
          <ShippingInfo
            shippingAddress={this.state.shippingAddress}
            newShippingAddress={this.state.newShippingAddress}
            user={this.state.user}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            addresses={this.props.addresses}
          />
        )}

        {/* Review Cart Items */}
        {formOnDisplay === 2 && (
          <CartReview cart={cart} shippingTax={this.state.shippingTax} />
        )}

        {/* Stripe checkout */}
        {formOnDisplay === 2 ? (
          cart.length ? (
            <StripeCheckout
              stripeKey="pk_test_GCRGm17fMoutB11ghvbPWDG000YXox6gCY"
              token={this.createOrder}
              billingAddress
              amount={cart.reduce(
                (sum, item) => item.quantity * item.product.price + sum,
                this.state.shippingTax
              )}
              disabled={
                typeof this.state.shippingAddress !== 'object' ||
                !this.state.user.email
              }
            />
          ) : (
            <Button type="button" disabled>
              Nothing in cart
            </Button>
          )
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapStateToProps = ({cart, user, addresses}) => ({cart, user, addresses})
const mapDispatchToProps = {fetchAddresses, createOrder, fetchDistance}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
