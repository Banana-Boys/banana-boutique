import React from 'react'
import {Input} from 'semantic-ui-react'
import {queryPusher} from '../../utilFrontEnd/queryPusher'

import {fetchProducts} from '../store/products'
import {queryParser} from '../../utilFrontEnd/queryParser'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
    const query = queryParser(this.props.location.search)
    const {search} = query
    this.state = {
      search: search || ''
    }
  }
  async handleSearch(e) {
    this.setState({search: e.target.value})
    if (this.props.location.pathname === '/products') {
      let {categories, inStock, sort, numPerPage} = queryParser(
        this.props.location.search
      )

      if (typeof categories === 'string') {
        categories = [categories]
      }

      const newState = {
        numPerPage: numPerPage || 10,
        categories: categories || [],
        inStock: Boolean(inStock) || false,
        sort: sort || '',
        search: e.target.value
      }

      await this.props.fetchProducts(newState)
      queryPusher(newState, this.props)
    }
  }

  handleEnter(e) {
    if (e.key === 'Enter' && this.props.location.pathname !== '/products') {
      this.props.history.push(`/products?search=${this.state.search}`)
    }
  }

  render() {
    return (
      <div id="search-bar">
        <Input
          placeholder="Search"
          type="text"
          id="search"
          value={this.state.search}
          onChange={this.handleSearch}
          onKeyPress={this.handleEnter}
        />
      </div>
    )
  }
}

const mapDispatch = {fetchProducts}

export default withRouter(connect(null, mapDispatch)(Search))
