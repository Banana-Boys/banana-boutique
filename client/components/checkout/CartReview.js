import React from 'react'
import CartItem from './CartItem'
import {Button, Header} from 'semantic-ui-react'

const CartReview = props => {
  const {cart, shippingTax} = props

  return (
    <div id="cartReview">
      <Header as="h2">Your Order</Header>
      {cart.map(item => {
        return <CartItem key={item.id} item={item} />
      })}
      {/* Subtotal and Total */}
      <h4>
        <em>Shipping tax:</em> {(shippingTax / 100).toFixed(2)}
      </h4>
      <hr />
      <h3>
        <em>Subtotal:</em> ${cart
          .reduce(
            (sum, item) => item.quantity * item.product.price / 100 + sum,
            shippingTax / 100
          )
          .toFixed(2)}
      </h3>
    </div>
  )
}

export default CartReview
