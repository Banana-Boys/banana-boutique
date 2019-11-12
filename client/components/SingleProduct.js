/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct, removeProduct} from '../store/singleProduct'
import {sendAddCartLineItem} from '../store/cart'
import Reviews from './Reviews'
import priceConvert from '../../utilFrontEnd/priceConvert'
import {fetchProductReviews} from '../store/reviews'
import {
  Button,
  Container,
  Grid,
  Header,
  Card,
  Item,
  Icon,
  Label
} from 'semantic-ui-react'
import '../styles/singleproduct.scss'
import {RatingsDistribution} from './RatingsDistribution'

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
    const user = this.props.user || {}

    // quantity select dropdown options
    let i = 1
    while (i <= product.inventory) {
      quantitySelect.push(
        <option key={i} selected={this.state.quantity == i}>
          {i}
        </option>
      )
      i++
    }

    return (
      <Container id="single-product">
        <Item.Group id="singleproduct-itemgroup">
          <Item>
            <Item.Image size="large" src={product.imageUrl} />
            <Item.Content>
              <Item.Header as="h1">{product.name}</Item.Header>
              <Item.Meta>
                <span className="cinema">
                  ${this.priceConvert(product.price)}
                </span>
              </Item.Meta>
              <Item.Description>
                <h4>{product.description}</h4>
                <h4>In Stock: {product.inventory}</h4>
                <h4>
                  Avg Rating:
                  {isNaN(product.sumratings / product.numratings)
                    ? ' No ratings'
                    : ` ${(product.sumratings / product.numratings).toFixed(
                        1
                      )} (${product.numratings} ${
                        Number(product.numratings) > 1 ? 'ratings' : 'rating'
                      })`}
                </h4>
                <RatingsDistribution reviews={this.props.reviews} />
              </Item.Description>
              <Item.Extra>
                {user.role === 'admin' ? (
                  <div>
                    <Button
                      color="red"
                      floated="right"
                      size="mini"
                      type="button"
                      onClick={this.handleDelete}
                    >
                      Delete Product
                    </Button>
                    <Button
                      primary
                      floated="right"
                      size="mini"
                      type="button"
                      onClick={this.handleEdit}
                    >
                      Edit Product
                    </Button>
                  </div>
                ) : (
                  <div />
                )}
                <Label>
                  Categories:
                  {categories.reduce((str, ele) => str + ' ' + ele.name, '')}
                </Label>
                <div id="add-to-cart-qty">
                  <div>Qty:</div>
                  <select
                    float="right"
                    id="quantitysort"
                    name="quantity"
                    onChange={this.handleChange}
                    style={{width: '50px'}}
                  >
                    {quantitySelect}
                  </select>

                  <Button
                    color="black"
                    floated="right"
                    size="mini"
                    disabled={!product.inventory}
                    onClick={this.handleAddToCart}
                  >
                    {product.inventory ? 'Add Product to Cart' : 'Out of Stock'}
                    <Icon name="right chevron" />
                  </Button>
                </div>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
        <Reviews />
      </Container>
    )
  }
}

const mapStateToProps = ({singleProduct, user, reviews}) => ({
  singleProduct,
  user,
  reviews
})
const mapDispatchToProps = {
  fetchProduct,
  removeProduct,
  sendAddCartLineItem,
  fetchProductReviews
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
