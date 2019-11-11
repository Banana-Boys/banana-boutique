import React from 'react'
import {Link} from 'react-router-dom'
import {Grid, Image, Container, Item, Card, Label} from 'semantic-ui-react'
import priceConvert from '../../utilFrontEnd/priceConvert'

const Product = props => {
  let product = props.product
  //console.log(product)
  // console.log('product in Product.js:', product)
  if (!product) {
    return <div>NO PRODUCT FOUND!</div>
  }

  return (
    <Item className="product-card">
      <Link to={`/products/${product.id}`}>
        <Item.Image src={product.imageUrl} />
        <Item.Content>
          <Item.Header>
            <h1>{product.name}</h1>
            <h2>${priceConvert(product.price)}</h2>
          </Item.Header>
          <Item.Description>
            {/* <h2>{product.description}</h2> */}
            <h6>
              Avg Rating:
              {isNaN(product.sumratings / product.numratings)
                ? 'No ratings'
                : (product.sumratings / product.numratings).toFixed(1)}
            </h6>
            {!product.inventory ? (
              <h6>OUT OF STOCK</h6>
            ) : (
              <h6>In Stock: {product.inventory}</h6>
            )}
            <h6>
              Categories:<ul>
                  {product.categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                  ))}
                </ul>
            </h6>
          </Item.Description>
        </Item.Content>
      </Link>
    </Item>
  )
}

export default Product
