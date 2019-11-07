import React, {Component} from 'react'
import {
  fetchCart,
  sendRemoveCartLineItem,
  sendEditCartLineItem
} from '../store/cart'
import priceConvert from '../../utilFrontEnd/priceConvert'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class Cart extends Component {
  constructor() {
    super()
    // this.state = {
    //   cartItems: []
    // }
    this.handleRemove = this.handleRemove.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  // componentWillReceiveProps() {
  //   // if (newProps.cart && newProps.cart.length > 0) {
  //   //   const itemIds = newProps.cart.map(item => item.productId)
  //   //   const {data} = await axios.get('/api/products', {
  //   //     params: {
  //   //       itemIds
  //   //     }
  //   //   })

  //   //   const cartItems = data.map((item, i) => ({
  //   //     ...item,
  //   //     quantity: newProps.cart[i].quantity
  //   //   }))

  //   //   this.setState({cartItems})
  //   // } else if (newProps.cart.length === 0) {
  //   //   this.setState({cartItems: []})
  //   // }
  //   this.props.fetchCart()
  // }

  handleRemove(productId) {
    this.props.removeProduct(productId)
  }

  handleQuantityChange(event) {
    const {name, value} = event.target //the name is the product id ;)
    this.props.editItem(+name, +value)
  }

  render() {
    let cartItems = this.props.cart
    const quantityOptions = function(inventory) {
      const options = []
      for (let i = 1; i <= inventory; i++) {
        options.push(<option key={i}>{i}</option>)
      }
      return options
    }
    // cartItems = cartItems.map(item => {
    //   const quantitySelect = []
    //   let i = 1
    //   while (i <= item.product.inventory) {
    //     quantitySelect.push(<option key={i}>{i}</option>)
    //     i++
    //   }
    //   return {
    //     ...item,
    //     quantitySelect
    //   }
    // })
    return (
      <div id="cart">
        {cartItems.map(item => {
          return (
            <div className="product" key={item.product.id}>
              <h4>{item.product.name}</h4>
              <select
                className="quantity"
                name={item.product.id}
                value={item.quantity}
                onChange={this.handleQuantityChange}
              >
                {quantityOptions(item.product.inventory)}
              </select>
              <p>Total: ${priceConvert(item.quantity * item.product.price)}</p>
              <img src={item.product.imageUrl} />
              <button
                type="button"
                onClick={() => this.handleRemove(item.product.id)}
              >
                Delete
              </button>
            </div>
          )
        })}
        <Link to="/checkout">
          <button type="button">Checkout</button>
        </Link>
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
