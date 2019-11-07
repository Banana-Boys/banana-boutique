import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import Product from './Product'
import Categories from './Categories'
import {Grid, Image, Container} from 'semantic-ui-react'
import Search from './Search'

export class AllProducts extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    try {
      await this.props.loadProducts()
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const products = this.props.products
    if (!products) {
      return <div>NO PRODUCTS!</div>
    }
    return (
      <Container>
        <div>
          <Search />
        </div>
        <div>
          <Categories />
        </div>
        <Grid>
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
