import React from 'react'
import {Link} from 'react-router-dom'
import {Grid, Image, Container, Item, Card} from 'semantic-ui-react'

const Product = props => {
  let product = props.product
  //console.log(product)
  // console.log('product in Product.js:', product)
  if (!product) {
    return <div>NO PRODUCT FOUND!</div>
  }

  return (
    <Item.Group>
      <Item>
        <Link to={`/products/${product.id}`}>
          <Item.Image src={product.imageUrl} />
          <Item.Content>
            <Item.Header as="h1">{product.name}</Item.Header>
            <Item.Meta>
              <span className="cinema">${product.price}</span>
            </Item.Meta>
            <Item.Description>
              {/* <h2>{product.description}</h2> */}
              {!product.inventory ? (
                <h6>OUT OF STOCK</h6>
              ) : (
                <h6>In Stock: {product.inventory}</h6>
              )}
              {/* <h3>
                Categories:{' '}
                <ul>
                  {product.categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                  ))}
                </ul>
              </h3>
              <h4>Number of ratings: {product.numratings}</h4> */}
              <h6>
                Avg Rating:
                {isNaN(product.sumratings / product.numratings)
                  ? 'No ratings'
                  : (product.sumratings / product.numratings).toFixed(1)}
              </h6>
            </Item.Description>
          </Item.Content>
        </Link>
      </Item>
    </Item.Group>
  )
}

export default Product
