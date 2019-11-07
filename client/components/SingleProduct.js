import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct, removeProduct} from '../store/singleProduct'
import {sendAddCartLineItem} from '../store/cart'
import Reviews from './Reviews'
import priceConvert from '../../utilFrontEnd/priceConvert'
import {fetchProductReviews} from '../store/review'
import {Button, Container, Header} from 'semantic-ui-react'

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
    const reviews = product.reviews || []
    const categories = product.categories || []
    const quantitySelect = []
    const sumofratings = reviews.reduce(function(a, b) {
      return b.rating == null ? a : a + b.rating
    }, 0)
    const avgrating = sumofratings / reviews.length
    let i = 1

    // quantity select dropdown options
    while (i <= product.inventory) {
      quantitySelect.push(<option key={i}>{i}</option>)
      i++
    }

    return (
      <Container id="product">
        <Container>
          <img src={product.imageUrl} />
        </Container>
        <Container>
          <Header as="h1">{product.name}</Header>
          <p>${this.priceConvert(product.price)}</p>
          <select
            id="quantity"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          >
            <p>{product.description}</p>
            <p>{categories.reduce((str, ele) => str + ' ' + ele.name, '')}</p>
            {quantitySelect}
          </select>
          <Button type="button" onClick={this.handleDelete}>
            Delete
          </Button>
          <Button type="button" onClick={this.handleEdit}>
            Edit
          </Button>
          {product.inventory ? (
            <Button type="button" onClick={this.handleAddToCart}>
              Add to Cart
            </Button>
          ) : (
            <Button type="button" disabled>
              Add to Cart
            </Button>
          )}
        </Container>

        <Container>
          <h4>Number of ratings: {reviews.length}</h4>
          <h4>Avg Rating: {avgrating}</h4>
          <Reviews revs={reviews} />
        </Container>
      </Container>
    )
  }
}

const mapStateToProps = ({singleProduct, user, review}) => ({
  singleProduct,
  user,
  review
})
const mapDispatchToProps = {
  fetchProduct,
  removeProduct,
  sendAddCartLineItem,
  fetchProductReviews
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
