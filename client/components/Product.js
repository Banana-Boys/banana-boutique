import React from 'react'
import {Link} from 'react-router-dom'
import {Grid, Image, Container} from 'semantic-ui-react'

const Product = props => {
  let product = props.product

  return (
    <Grid>
      <Link to={`/products/${product.id}`}>
        <Grid.Row>
          <Grid.Column>
            <Image src={product.imageUrl} />
          </Grid.Column>
          <Grid.Column>
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
          </Grid.Column>
        </Grid.Row>
      </Link>
    </Grid>
  )
}

export default Product
