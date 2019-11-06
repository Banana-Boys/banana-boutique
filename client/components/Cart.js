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

  componentDidMount() {
    this.props.fetchCart()
  }

  async componentWillReceiveProps(newProps) {
    console.log('props')
    if (newProps.cart && newProps.cart.length > 0) {
      const itemIds = newProps.cart.map(item => item.productId)
      const {data} = await axios.get('/api/products', {
        params: {
          itemIds
        }
      })
      this.setState({cartItems: data})
    }
  }

  render() {
    console.log('render')
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
