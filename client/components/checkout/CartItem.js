import React from 'react'
import priceConvert from '../../../utilFrontEnd/priceConvert'
import {Link} from 'react-router-dom'

const CartItem = props => {
  const item = props.item
  return (
    <div className="product" key={item.product.id}>
      <Link to={`/products/${item.product.id}`}>
        <img src={item.product.imageUrl} />
      </Link>
      <h4>
        <Link to={`/products/${item.product.id}`}>{item.product.name}</Link> -{' '}
        <em>quantity:</em> {item.quantity} - <em>price:</em> ${priceConvert(
          item.product.price
        )}{' '}
        x {item.quantity} = ${priceConvert(item.product.price * item.quantity)}
      </h4>
    </div>
  )
}

export default CartItem
