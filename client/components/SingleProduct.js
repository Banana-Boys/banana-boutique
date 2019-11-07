import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct, removeProduct} from '../store/singleProduct'
import {sendAddCartLineItem} from '../store/cart'
import Reviews from './Reviews'
import priceConvert from '../../utilFrontEnd/priceConvert'
import {fetchProductReviews} from '../store/reviews'

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
    this.priceConvert = priceConvert
  }

  async componentDidMount() {
    await this.props.fetchProduct(this.props.match.params.id)
    await this.props.fetchProductReviews(this.props.match.params.id)
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

  render() {
    const product = this.props.singleProduct || {}
    const categories = product.categories || []
    const quantitySelect = []

    // quantity select dropdown options
    let i = 1
    while (i <= product.inventory) {
      quantitySelect.push(<option key={i}>{i}</option>)
      i++
    }

    return (
      <div id="product">
        <h1>{product.name}</h1>
        <p>{categories.reduce((str, ele) => str + ' ' + ele.name, '')}</p>
        <img src={product.imageUrl} />
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
          Delete Product
        </button>
        <button type="button" onClick={this.handleEdit}>
          Edit Product
        </button>
        <button
          disabled={!product.inventory}
          type="button"
          onClick={this.handleAddToCart}
        >
          Add Product to Cart
        </button>

        <h4>Number of ratings: {product.numratings}</h4>
        <h4>
          Avg Rating:{' '}
          {isNaN(product.sumratings / product.numratings)
            ? 'No ratings'
            : (product.sumratings / product.numratings).toFixed(1)}
        </h4>
        <Reviews />
      </div>
    )
  }
}

const mapStateToProps = ({singleProduct, user}) => ({
  singleProduct,
  user
})
const mapDispatchToProps = {
  fetchProduct,
  removeProduct,
  sendAddCartLineItem,
  fetchProductReviews
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
