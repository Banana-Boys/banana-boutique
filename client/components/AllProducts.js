import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import Product from './Product'
import Queries from './Queries'
import {Link} from 'react-router-dom'
import {Grid, Image, Container, Card} from 'semantic-ui-react'

import '../styles/allproducts.scss'

export class AllProducts extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    const products = this.props.products
    return (
      <Container id="all-products">
        <Queries />
        {products.length > 0 && (
          <Grid centered>
            {products.map(product => (
              <Product key={product.id} product={product} />
            ))}
          </Grid>
        )}
        {products.length === 0 && <div>NO PRODUCTS!</div>}
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
