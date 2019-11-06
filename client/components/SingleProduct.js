import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct, removeProduct} from '../store/singleProduct'
import {sendAddCartLineItem} from '../store/cart'
import Reviews from './Reviews'
class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id)
  }

  handleDelete() {
    this.props.removeProduct(this.props.singleProduct.id, this.props.history)
  }

  handleEdit() {
    this.props.history.push(`/products/${this.props.singleProduct.id}/edit`)
  }

  handleAddToCart() {
    const productId = this.props.singleProduct.id
    this.props.sendAddCartLineItem(productId, 1, this.props.history)
  }

  render() {
    const product = this.props.singleProduct || {}
    console.log(product)
    return (
      <div id="product">
        <h1>{product.name}</h1>
        <img src={product.imageUrl || '/images/default-banana.jpg'} />
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
