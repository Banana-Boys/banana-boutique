import React, {Component} from 'react'
import {destroyProductInCart} from '../store/cart'
import {connect} from 'react-redux'

export class Cart extends Component {
  constructor() {
    super()
    this.state = {
      cartItems: []
    }
  }
  componentDidMount() {
    //get all cart items given ids
  }

  render() {
    return <div>{this.state.cartItems.map(item => item.name)}</div>
  }
}

const mapStateToProps = state => ({
  products: state.products,
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  removeProduct: product => dispatch(destroyProductInCart(product))
})

//export default connect(mapStatetProps, mapDispatchToProps)(Cart)
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
