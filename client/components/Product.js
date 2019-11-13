import React from 'react'
import {Link} from 'react-router-dom'
import {
  Grid,
  Image,
  Container,
  Item,
  Card,
  Label,
  Button
} from 'semantic-ui-react'
import priceConvert from '../../utilFrontEnd/priceConvert'
import '../styles/product.scss'

const Product = props => {
  let product = props.product
  //console.log(product)
  // console.log('product in Product.js:', product)
  if (!product) {
    return <div>No products found</div>
  }

  return (
    <Item
      className="product-card"
      style={{opacity: product.inventory ? null : 0.6}}
    >
      <Link to={`/products/${product.id}`}>
        <Item.Image src={product.imageUrl} />
        <Item.Content>
          <Item.Header>
            <h1>{product.name}</h1>
            <h2>${priceConvert(product.price)}</h2>
          </Item.Header>
          <Item.Description>
            {product.categories ? (
              <Button
                className="left labeled"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  alignItems: 'center'
                }}
              >
                <Label className="basic right categories-button">
                  Categories:{' '}
                </Label>
                <Button className="categories-button">
                  {product.categories.map(category => (
                    <span
                      className="categoryLink"
                      key={category.id}
                      style={{margin: '0 3px'}}
                      to={`/products?categories=${category.id}`}
                    >
                      {category.name}
                    </span>
                  ))}
                </Button>
              </Button>
            ) : null}
            <div className="product-info">
              Avg Rating:
              {isNaN(product.sumratings / product.numratings) ? (
                <em> No ratings</em>
              ) : (
                <span>
                  {' '}
                  <strong>
                    {(product.sumratings / product.numratings).toFixed(1)}
                  </strong>{' '}
                  <em>
                    ({product.numratings}{' '}
                    {Number(product.numratings) > 1 ? 'ratings' : 'rating'})
                  </em>
                </span>
              )}
            </div>
            {!product.inventory ? (
              <div className="product-info">OUT OF STOCK</div>
            ) : (
              <div className="product-info">
                In Stock: <strong>{product.inventory}</strong>
              </div>
            )}
          </Item.Description>
        </Item.Content>
      </Link>
    </Item>
  )
}

export default Product
