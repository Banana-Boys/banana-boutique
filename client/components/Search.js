import React, {Component} from 'react'
import {connect} from 'react-redux'
// import ReactSearchBox from 'react-search-box'
import {fetchFilteredProducts} from '../store/products'

export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = this.buildInitialState()
  }

  buildInitialState() {
    return {
      searchTerms: []
    }
  }

  render() {
    return <div />
  }
}

const mapState = (state, props) => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => ({
  findProducts: searchTerms => dispatch(fetchFilteredProducts(searchTerms))
})

export default connect(mapState, mapDispatch)(Search)
