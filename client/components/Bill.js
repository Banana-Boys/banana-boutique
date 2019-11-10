import React from 'react'
import priceConvert from '../../utilFrontEnd/priceConvert'

const Bill = props => {
  const cart = props.cart
  const total = cart.reduce((sum, item) => {
    return sum + item.quantity * item.product.price
  }, 0)
  return (
    <div id="bill-display">
      {cart.map(({quantity, product}) => {
        return (
          <h4 key={product.id}>
            {product.name} -- {quantity} x ${priceConvert(product.price)}
          </h4>
        )
      })}
      <h3 id="total">${priceConvert(total)}</h3>
    </div>
  )
}

export default Bill
