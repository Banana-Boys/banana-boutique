import React from 'react'
import {Link} from 'react-router-dom'

const Product = props => {
  let product = props.product

  return (
    <Link to={`/products/${product.id}`}>
      <div>
        <img src={product.imageUrl} />
      </div>
      <div>
        <h1>{product.name}</h1>
        <h2>{product.description}</h2>
        <h2>price: {product.price}</h2>
        <h3>In Stock: {product.quantity}</h3>
        <h3>
          Categories:{' '}
          <ul>
            {product.categories.map(category => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </h3>
      </div>
    </Link>
  )
}

export default Product
