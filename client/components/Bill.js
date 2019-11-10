import React from 'react'
import priceConvert from '../../utilFrontEnd/priceConvert'

const Bill = props => {
  const cart = props.cart
  const total = cart.reduce((sum, item) => {
    return sum + item.quantity * item.product.price
  }, 0)
  return (
    <div id="cart-display">
      {cart.map(({quantity, product}) => {
        return (
          <div key={product.id}>
            {product.name} - {quantity}
          </div>
        )
      })}
      <h3>Total ${priceConvert(total)}</h3>
    </div>
  )
}

export default Bill
