import React, {Component} from 'react'
import {
  fetchCart,
  sendRemoveCartLineItem,
  sendEditCartLineItem
} from '../store/cart'
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
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  async componentWillReceiveProps(newProps) {
    console.log('props1')
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
    } else if (newProps.cart.length === 0) {
      this.setState({cartItems: []})
    }
  }

  handleRemove(productId) {
    this.props.removeProduct(productId)
  }

  handleQuantityChange(event) {
    const {name, value} = event.target //the name is the product id ;)
    this.props.editItem(+name, +value)
  }

  render() {
    console.log('render')
    let cartItems = this.state.cartItems
    cartItems = cartItems.map(item => {
      const quantitySelect = []
      let i = 1
      while (i <= item.inventory) {
        quantitySelect.push(<option key={i}>{i}</option>)
        i++
      }
      return {
        ...item,
        quantitySelect
      }
    })
    return (
      <div id="cart">
        {cartItems.map(item => {
          return (
            <div className="product" key={item.id}>
              <h4>{item.name}</h4>
              <select
                className="quantity"
                name={item.id}
                value={item.quantity}
                onChange={this.handleQuantityChange}
              >
                {item.quantitySelect}
              </select>
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
  fetchCart: () => dispatch(fetchCart()),
  editItem: (productId, quantity) =>
    dispatch(sendEditCartLineItem(productId, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
