import react from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import Product from './Product'

export class AllProducts extends react.Component {
  render() {
    const products = this.props.products
    console.log('here')
    if (!products) {
      return <div>NO PROJECTS!</div>
    }
    return <div>{products.map(product => <Product product={product} />)}</div>
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
