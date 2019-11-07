/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import priceConvert from '../../utilFrontEnd/priceConvert'
import {Login, Signup} from './auth-form'

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
      user: this.props.user || {}
    }
    this.handleUserOptions = this.handleUserOptions.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({cart: newProps.cart, user: newProps.user})
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

  handleSubmit(e) {
    e.preventDefault()
    this.setState({user: {email: e.target.email.value}})
  }

  render() {
    const cart = this.props.cart
    let {login, signup, continueAsGuest} = this.state.showUserOptions

    return (
      <div id="cart">
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
        {this.state.user.email ? null : (
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
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" />
                <button type="submit">Submit</button>
              </form>
            ) : null}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({cart, user}) => ({cart, user})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
