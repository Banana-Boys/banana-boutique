import React from 'react'
import {Link} from 'react-router-dom'
import {Grid, Image, Container} from 'semantic-ui-react'

const Product = props => {
  let product = props.product
  console.log(product)
  // console.log('product in Product.js:', product)
  if (!product) {
    return <div>NO PRODUCT FOUND!</div>
  }

  return (
    <Grid divided="vertically">
      <Link to={`/products/${product.id}`}>
        <Grid.Row width={3}>
          <Image src={product.imageUrl} />
        </Grid.Row>
        <Grid.Row width={3}>
          <h1>{product.name}</h1>
          <h2>{product.description}</h2>
          <h2>price: {product.price}</h2>
          {!product.inventory ? (
            <h2>OUT OF STOCK</h2>
          ) : (
            <h2>In Stock: {product.inventory}</h2>
          )}
          <h3>
            Categories:{' '}
            <ul>
              {product.categories.map(category => (
                <li key={category.id}>{category.name}</li>
              ))}
            </ul>
          </h3>
          <h4>Number of ratings: {product.numratings}</h4>
          <h4>
            Avg Rating:{' '}
            {isNaN(product.sumratings / product.numratings)
              ? 'No ratings'
              : (product.sumratings / product.numratings).toFixed(1)}
          </h4>
        </Grid.Row>
      </Link>
    </Grid>
  )
}

export default Product
