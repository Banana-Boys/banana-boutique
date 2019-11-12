import React, {Component} from 'react'
import {connect} from 'react-redux'
import Product from './Product'
import Queries from './Queries'
import {Grid, Container} from 'semantic-ui-react'

import '../styles/allproducts.scss'

export class AllProducts extends Component {
  async componentDidMount() {}

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

export default connect(mapStateToProps, null)(AllProducts)
