import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct, deleteProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id)
  }

  handleDelete() {
    this.props.deleteProduct(this.props.singleProduct.id, this.props.history)
  }

  handleEdit() {
    this.props.history.push(`/products/${this.props.singleProduct.id}/edit`)
  }

  render() {
    const product = this.props.singleProduct || {}
    console.log(product)
    return (
      <div id="product">
        <h1>{product.name}</h1>
        <img src={product.imageUrl || '/images/default-banana.jpg'} />
        <button type="button" onClick={this.handleDelete}>
          Delete
        </button>
        <button type="button" onClick={this.handleEdit}>
          Edit
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({singleProduct}) => ({singleProduct})
const mapDispatchToProps = {fetchProduct, deleteProduct}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
