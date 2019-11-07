import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import Product from './Product'
import Categories from './Categories'
import {Link} from 'react-router-dom'

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
      <div>
        <div>
          <input
            type="text"
            className="input"
            id="search"
            placeholder="Search..."
          />
          <button type="submit" className="button">
            Search{' '}
          </button>
        </div>
        <div>
          <Categories />
        </div>
        <div>
          {products.map(product => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <Product product={product} />
            </Link>
          ))}
        </div>
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
