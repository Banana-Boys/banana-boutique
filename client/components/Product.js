import React from 'react'
import {Link} from 'react-router-dom'

const Product = props => {
  let product = props.product

  return (
    <div>
      <div>
        <img src={product.imageUrl} />
      </div>
      <div>
        <h1>{product.name}</h1>

        <h2>{product.description}</h2>
        <h2>price: {product.price}</h2>
        {!product.inventory ? (
          <h2>OUT OF STOCK</h2>
        ) : (
          <h2>In Stock: {product.inventory}</h2>
        )}
      </div>
    </div>
  )
}

export default Product
