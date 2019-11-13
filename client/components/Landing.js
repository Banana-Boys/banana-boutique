import React from 'react'
import {Link} from 'react-router-dom'
import {Item} from 'semantic-ui-react'
import axios from 'axios'
import priceConvert from '../../utilFrontEnd/priceConvert'
import {connect} from 'react-redux'
import '../styles/landing.scss'
import '../styles/product.scss'
import Product from './Product'

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
    const yellowCategory = this.props.categories.find(
      category => category.name === 'Yellow'
    )
    const greenCategory = this.props.categories.find(
      category => category.name === 'Green'
    )
    const yellowUrl = yellowCategory
      ? `/products?categories=${
          this.props.categories.find(category => category.name === 'Yellow').id
        }`
      : ''
    const greenUrl = greenCategory
      ? `/products?categories=${
          this.props.categories.find(category => category.name === 'Green').id
        }`
      : ''
    return (
      <div id="landing">
        <img
          id="banner"
          src="https://nanas-image-store.s3.us-east-2.amazonaws.com/banner-1.jpg"
        />
        <h1 className="row-header">Top Categories</h1>
        <div id="categories-landing">
          <Link to={yellowUrl}>
            <div className="cat-card yellow">
              <img
                className="catImage"
                src="https://nanas-image-store.s3.us-east-2.amazonaws.com/cat-nana-yellow.jpg"
              />
              <h2>Yellow Nanas</h2>
            </div>
          </Link>
          <Link to={greenUrl}>
            <div className="cat-card green">
              <img
                className="catImage"
                src="https://nanas-image-store.s3.us-east-2.amazonaws.com/cat-nana-green.jpg"
              />
              <h2>Green Nanas</h2>
            </div>
          </Link>
        </div>
        <h1 className="row-header">Most Rated</h1>
        <div id="topProducts">
          {products.map(product => {
            return <Product key={product.id} product={product} />
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({categories}) => ({categories})
export default connect(mapStateToProps)(Landing)
