import React from 'react'
import priceConvert from '../../../utilFrontEnd/priceConvert'

const CartItem = props => {
  const item = props.item
  return (
    <div className="product" key={item.product.id}>
      <img src={item.product.imageUrl} />
      <h4>
        {item.product.name} - <em>quantity:</em> {item.quantity} -{' '}
        <em>price:</em> ${priceConvert(item.product.price)} x {item.quantity} =
        ${priceConvert(item.product.price * item.quantity)}
      </h4>
    </div>
  )
}

export default CartItem
