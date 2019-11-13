import React from 'react'
import {Link} from 'react-router-dom'
import {Item} from 'semantic-ui-react'
import axios from 'axios'
import priceConvert from '../../utilFrontEnd/priceConvert'

import '../styles/landing.scss'

class Landing extends React.Component {
  constructor() {
    super()
    this.state = {
      topProducts: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/products/top')
    console.log(data)
    this.setState({
      topProducts: data
    })
  }

  render() {
    const products = this.state.topProducts || []
    return (
      <div id="landing">
        <img src="https://nanas-image-store.s3.us-east-2.amazonaws.com/banner-1.jpg" />
        <h1 className="row-header">Top Categories</h1>
        <div id="categories-landing">
          <Link to="/products?categories=3">
            <div className="cat-card yellow">
              <img src="https://nanas-image-store.s3.us-east-2.amazonaws.com/cat-nana-yellow.jpg" />
              <h2>Yellow Nanas</h2>
            </div>
          </Link>
          <Link to="/products?categories=2">
            <div className="cat-card green">
              <img src="https://nanas-image-store.s3.us-east-2.amazonaws.com/cat-nana-green.jpg" />
              <h2>Green Nanas</h2>
            </div>
          </Link>
        </div>
        <h1 className="row-header">Most Rated</h1>
        <div id="topProducts">
          {products.map(product => {
            return (
              <Link key={product.id} to={`products/${product.id}`}>
                <div className="product-card">
                  <img src={product.imageUrl} />
                  <Item.Content>
                    <Item.Header className="header">
                      <h1>{product.name}</h1>
                      <h2>${priceConvert(product.price)}</h2>
                    </Item.Header>
                    <Item.Description className="description">
                      {/* <h2>{product.description}</h2> */}
                      <h6>
                        Avg Rating:
                        {isNaN(product.sumratings / product.numratings)
                          ? ' No ratings'
                          : ` ${(
                              product.sumratings / product.numratings
                            ).toFixed(1)} (${product.numratings} ${
                              Number(product.numratings) > 1
                                ? 'ratings'
                                : 'rating'
                            })`}
                      </h6>
                      {!product.inventory ? (
                        <h6>OUT OF STOCK</h6>
                      ) : (
                        <h6>In Stock: {product.inventory}</h6>
                      )}
                    </Item.Description>
                  </Item.Content>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
}
export default Landing
