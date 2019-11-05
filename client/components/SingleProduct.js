import react from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'

class SingleProduct extends react.Component {
  async componentDidMount() {
    const productId = 1 //this.match.params or something
    await this.props.loadProduct(productId)
  }

  render() {
    return 'hello world'
  }
}

const mapStateToProps = state => ({product: state.singleProduct})
const mapDispatchToProps = dispatch => ({
  loadProduct: productId => dispatch(fetchProduct(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
