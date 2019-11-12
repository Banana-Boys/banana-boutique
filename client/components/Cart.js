import React, {Component} from 'react'
import {
  fetchCart,
  sendRemoveCartLineItem,
  sendEditCartLineItem
} from '../store/cart'
import priceConvert from '../../utilFrontEnd/priceConvert'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'
import Bill from './Bill'

import '../styles/cart.scss'
export class Cart extends Component {
  constructor() {
    super()
    this.handleRemove = this.handleRemove.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  handleRemove(productId) {
    this.props.removeProduct(productId)
  }

  handleQuantityChange(event) {
    const {name, value} = event.target //the name is the product id ;)
    this.props.editItem(+name, +value)
  }

  render() {
    let cartItems = this.props.cart
    const quantityOptions = (inventory, quantity) => {
      const options = []
      for (let i = 1; i <= inventory; i++) {
        options.push(
          <option key={i} selected={i == quantity}>
            {i}
          </option>
        )
      }
      return options
    }
    return (
      <div id="cart">
        <div id="products" className={cartItems.length === 0 ? 'empty' : ''}>
          <h1>Cart</h1>
          {cartItems.length === 0 && (
            <div className="empty-message">An empty cart, so sad...</div>
          )}
          {cartItems.map(item => {
            return (
              <div className="product" key={item.product.id}>
                <Link to={`/products/${item.product.id}`}>
                  <img src={item.product.imageUrl} />
                </Link>
                <div className="product-info">
                  <h2>${priceConvert(item.product.price)}</h2>
                  <Link to={`/products/${item.product.id}`}>
                    {item.product.name}
                  </Link>
                  <div className="quantity-select">
                    <p>Qty:</p>
                    <select
                      className="quantity"
                      name={item.product.id}
                      value={item.quantity}
                      onChange={this.handleQuantityChange}
                    >
                      {quantityOptions(item.product.inventory, item.quantity)}
                    </select>
                  </div>
                </div>
                <div>
                  <div
                    className="delete-button"
                    onClick={() => this.handleRemove(item.product.id)}
                  >
                    X
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div id="bill">
          <h1>Total</h1>
          <Bill cart={cartItems} />
          {cartItems.length ? (
            <div>
              <Link to="/checkout">
                <Button type="button">Checkout</Button>
              </Link>
              {this.props.user.id ? (
                <Link to="wishlists/new">
                  <Button type="button">Create Wishlist</Button>
                </Link>
              ) : null}
            </div>
          ) : (
            <Button type="button" disabled>
              Nothing in cart
            </Button>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  removeProduct: productId => dispatch(sendRemoveCartLineItem(productId)),
  fetchCart: () => dispatch(fetchCart()),
  editItem: (productId, quantity) =>
    dispatch(sendEditCartLineItem(productId, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
