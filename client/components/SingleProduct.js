/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct, removeProduct} from '../store/singleProduct'
import {sendAddCartLineItem} from '../store/cart'
import Reviews from './Reviews'
import priceConvert from '../../utilFrontEnd/priceConvert'
import {fetchProductReviews} from '../store/reviews'
import {Link} from 'react-router-dom'
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
          <Item style={{alignItems: 'center'}}>
            <Item.Image
              size="large"
              id="product-image"
              src={product.imageUrl}
              style={{
                border: '4px solid #ffeecf',
                borderRadius: '20px',
                overflow: 'hidden'
              }}
            />
            <Item.Content>
              <Item.Header as="h1">{product.name}</Item.Header>
              <Item.Meta>
                <span className="cinema">
                  ${this.priceConvert(product.price)}
                </span>
              </Item.Meta>
              <Item.Description>
                <h4>{product.description}</h4>
                <p>
                  In Stock: <strong>{product.inventory}</strong>
                </p>
                <p>
                  Avg Rating:
                  {isNaN(product.sumratings / product.numratings) ? (
                    <strong> No ratings</strong>
                  ) : (
                    <span>
                      <strong>
                        {' '}
                        {(product.sumratings / product.numratings).toFixed(1)}
                      </strong>{' '}
                      <em>
                        ({product.numratings}{' '}
                        {Number(product.numratings) > 1 ? 'ratings' : 'rating'})
                      </em>
                    </span>
                  )}
                </p>
                <Container>
                  <RatingsDistribution reviews={this.props.reviews} />
                </Container>
              </Item.Description>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '80%',
                  maxWidth: '300px',
                  alignItems: 'center'
                }}
              >
                <Button
                  className="left labeled"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    alignItems: 'center',
                    margin: '10px 0'
                  }}
                >
                  <Label className="basic right">Categories: </Label>
                  <Button>
                    {categories.map(category => (
                      <Link
                        className="categoryLink"
                        key={category.id}
                        style={{margin: '0 3px'}}
                        to={`/products?categories=${category.id}`}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </Button>
                </Button>

                {user.role === 'admin' ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      width: '100%',
                      alignItems: 'center',
                      margin: '10px 0'
                    }}
                  >
                    <Button
                      primary
                      size="mini"
                      type="button"
                      onClick={this.handleEdit}
                    >
                      Edit Product
                    </Button>
                    <Button
                      color="red"
                      size="mini"
                      type="button"
                      onClick={this.handleDelete}
                    >
                      Delete Product
                    </Button>
                  </div>
                ) : null}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    width: '100%',
                    alignItems: 'center',
                    margin: '10px 0'
                  }}
                >
                  <div id="add-to-cart-qty">
                    <label htmlFor="qty">Qty:</label>
                    <select
                      float="right"
                      id="quantitysort"
                      name="quantity"
                      value={this.state.quantity}
                      onChange={this.handleChange}
                      style={{width: '40px', padding: '5px'}}
                    >
                      {quantitySelect}
                    </select>
                  </div>

                  <Button
                    color="black"
                    floated="right"
                    size="mini"
                    disabled={!product.inventory}
                    onClick={this.handleAddToCart}
                    style={{marginLeft: '10px'}}
                  >
                    {product.inventory ? 'Add Product to Cart' : 'Out of Stock'}
                    <Icon name="right chevron" />
                  </Button>
                </div>
              </div>
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
