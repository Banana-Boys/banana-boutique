import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct, removeProduct} from '../store/singleProduct'
import {sendAddCartLineItem} from '../store/cart'
import Reviews from './Reviews'
import priceConvert from '../../utilFrontEnd/priceConvert'
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

  render() {
    const product = this.props.singleProduct || {}
    const reviews = product.reviews || []
    const categories = product.categories || []
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
          Delete
        </button>
        <button type="button" onClick={this.handleEdit}>
          Edit
        </button>
        <button type="button" onClick={this.handleAddToCart}>
          Add to Cart
        </button>
        <h4>Number of ratings: {reviews.length}</h4>
        <h4>
          Avg Rating:
          {reviews.reduce((pv, cv) => {
            return pv + cv
          }, 0) / reviews.length}
          {console.log('nan')}
        </h4>
        <Reviews reviews={reviews} />
      </div>
    )
  }
}

const mapStateToProps = ({singleProduct, user}) => ({singleProduct, user})
const mapDispatchToProps = {fetchProduct, removeProduct, sendAddCartLineItem}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
