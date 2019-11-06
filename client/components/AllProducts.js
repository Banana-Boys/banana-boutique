import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import Product from './Product'

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
    console.log(this.props)
    console.log('here')
    if (!products) {
      return <div>NO PROJECTS!</div>
    }
    return (
      <div>
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
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
