import react from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'

class SingleProduct extends react.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProduct(this.match.params.id)
  }

  render() {}
}

const mapStateToProps = ({singleProduct}) => ({singleProduct})
const mapDispatchToProps = {fetchProduct}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
