import React, {Component} from 'react'
import {destroyProductInCart} from '../store/cart'
import {connect} from 'net'

export class Cart extends Component {
  render() {
    //const products = this.props.products
    return (
      <div>
        <div />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  removeProduct: product => dispatch(destroyProductInCart(product))
})

//export default connect(mapStatetProps, mapDispatchToProps)(Cart)
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
