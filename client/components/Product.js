import React from 'react'

const Product = props => {
  let product = props.product
  // console.log('product in Product.js:', product)
  if (!product) {
    return <div>NO PRODUCT FOUND!</div>
  }

  return (
    <div>
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
    </div>
  )
}

export default Product
