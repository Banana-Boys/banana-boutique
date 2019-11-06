import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct, removeProduct} from '../store/singleProduct'
import {sendAddCartLineItem} from '../store/cart'
import Reviews from './Reviews'
class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: '1'
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id)
  }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDelete() {
    this.props.removeProduct(this.props.singleProduct.id, this.props.history)
  }

  handleEdit() {
    this.props.history.push(`/products/${this.props.singleProduct.id}/edit`)
  }

  handleAddToCart() {
    const productId = this.props.singleProduct.id
    this.props.sendAddCartLineItem(
      productId,
      +this.state.quantity,
      this.props.history
    )
  }

  priceConvert(price = 9999) {
    let string = price.toString()
    return string.slice(0, -2) + '.' + string.slice(-2)
  }

  render() {
    const product = this.props.singleProduct || {}
    const quantitySelect = []
    let i = 1

    // quantity select dropdown options
    while (i <= product.inventory) {
      quantitySelect.push(<option key={i}>{i}</option>)
      i++
    }

    return (
      <div id="product">
        <h1>{product.name}</h1>
        <img src={product.imageUrl || '/images/default-banana.jpg'} />
        <p>{product.description}</p>
        <p>${this.priceConvert(product.price)}</p>
        <select
          id="quantity"
          name="quantity"
          value={this.state.quantity}
          onChange={this.handleChange}
        >
          {quantitySelect}
        </select>
        <button type="button" onClick={this.handleDelete}>
          Delete
        </button>
        <button type="button" onClick={this.handleEdit}>
          Edit
        </button>
        <button type="button" onClick={this.handleAddToCart}>
          Add to Cart
        </button>
        <Reviews />
      </div>
    )
  }
}

const mapStateToProps = ({singleProduct, user}) => ({singleProduct, user})
const mapDispatchToProps = {fetchProduct, removeProduct, sendAddCartLineItem}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
