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
    const quantityOptions = inventory => {
      const options = []
      for (let i = 1; i <= inventory; i++) {
        options.push(<option key={i}>{i}</option>)
      }
      return options
    }
    return (
      <div id="cart">
        <div id="products">
          <h1>Cart</h1>
          {cartItems.map(item => {
            return (
              <div className="product" key={item.product.id}>
                <img src={item.product.imageUrl} />
                <div className="product-info">
                  <h2>${priceConvert(item.product.price)}</h2>
                  <p>{item.product.name}</p>
                  <div className="quantity-select">
                    <p>Qty:</p>
                    <select
                      className="quantity"
                      name={item.product.id}
                      value={item.quantity}
                      onChange={this.handleQuantityChange}
                    >
                      {quantityOptions(item.product.inventory)}
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
          <Link to="/checkout">
            <Button type="button">Checkout</Button>
          </Link>
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
