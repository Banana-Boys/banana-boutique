import React, {Component} from 'react'
import {fetchCart, sendRemoveCartLineItem} from '../store/cart'
import priceConvert from '../../utilFrontEnd/priceConvert'
import {connect} from 'react-redux'
import axios from 'axios'

export class Cart extends Component {
  constructor() {
    super()
    this.state = {
      cartItems: []
    }
    this.handleRemove = this.handleRemove.bind(this)
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

      const cartItems = data.map((item, i) => ({
        ...item,
        quantity: newProps.cart[i].quantity
      }))

      this.setState({cartItems})
    }
  }

  handleRemove(productId) {
    this.props.removeProduct(productId)
  }

  render() {
    console.log('render')
    const cartItems = this.state.cartItems
    return (
      <div id="cart">
        {cartItems.map(item => {
          return (
            <div className="product" key={item.id}>
              <h4>{item.name}</h4>
              <p>{item.id}</p>
              <p>Total: ${priceConvert(item.quantity * item.price)}</p>
              <img src={item.imageUrl} />
              <button type="button" onClick={() => this.handleRemove(item.id)}>
                Delete
              </button>
            </div>
          )
        })}
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
  fetchCart: () => dispatch(fetchCart())
})

//export default connect(mapStatetProps, mapDispatchToProps)(Cart)
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
