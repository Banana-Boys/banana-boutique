import React, {Component} from 'react'
import {fetchCart, destroyProductInCart} from '../store/cart'
import {connect} from 'react-redux'
import axios from 'axios'

export class Cart extends Component {
  constructor() {
    super()
    this.state = {
      cartItems: []
    }
  }

  async componentWillReceiveProps(newProps) {
    const cartItems = newProps.cart.map(item => {
      const res = axios.get(`/api/products/${item.productId}`)
      return res
    })
    const items = await Promise.all(cartItems)
    this.setState({cartItems: items.map(ele => ele.data)})
  }

  render() {
    const cartItems = this.state.cartItems
    return <div id="cart">{cartItems.map(item => item.name)}</div>
  }
}

const mapStateToProps = state => ({
  products: state.products,
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  removeProduct: product => dispatch(destroyProductInCart(product)),
  fetchCart: () => dispatch(fetchCart())
})

//export default connect(mapStatetProps, mapDispatchToProps)(Cart)
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
