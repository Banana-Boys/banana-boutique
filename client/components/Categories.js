/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../store/categories'
import {fetchProducts} from '../store/products'
import {withRouter} from 'react-router-dom'
import {queryParser} from '../../utilFrontEnd/queryParser'
import {queryPusher} from '../../utilFrontEnd/queryPusher'
import {fetchCategory} from '../store/singleCategory'
import {Link} from 'react-router-dom'

export class Categories extends Component {
  constructor(props) {
    super(props)
    const query = queryParser(this.props.location.search)
    const {categories, search, inStock, sort} = query
    this.state = {
      categories: categories || [],
      search: search || '',
      inStock: Boolean(inStock) || false,
      sort: sort || '',
      editCategory: {}
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleInStock = this.handleInStock.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllCategories()
    this.props.fetchProducts(this.state)
  }

  updateCategorySelected = event => {
    event.persist()
    let newState
    if (event.target.checked) {
      newState = {
        ...this.state,
        categories: [...this.state.categories, event.target.value]
      }
      this.setState(newState)
    } else {
      newState = {
        ...this.state,
        categories: this.state.categories.filter(
          categoryId => categoryId !== event.target.value
        )
      }
      this.setState(newState)
    }
    this.props.fetchProducts(newState)
    queryPusher(newState, this.props)
  }

  handleSearch(e) {
    const newState = {...this.state, search: e.target.value}
    this.setState(newState)
    this.props.fetchProducts(newState)
    queryPusher(newState, this.props)
  }

  handleInStock() {
    const newState = {...this.state, inStock: !this.state.inStock}
    this.setState(newState)
    this.props.fetchProducts(newState)
    queryPusher(newState, this.props)
  }

  handleSort(e) {
    const newState = {
      ...this.state,
      sort: [...e.target.options].filter(option => option.selected)[0].value
    }
    this.setState(newState)
    this.props.fetchProducts(newState)
    queryPusher(newState, this.props)
  }

  handleEdit(event) {
    event.preventDefault()
    console.log('this.props.category.id', this.props.category.id)
    // console.log('event.target:', event)
    // let catId = Number(event.target.value)
    // console.log('catId:', catId)
    this.props.gotoCategory(this.props.category.id)
  }

  handleAdd() {}

  render() {
    let categories = this.props.categories
    const isAdmin = this.state.isAdmin
    return (
      <div id="filters">
        <div id="seach-bar">
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            id="search"
            value={this.state.search}
            onChange={this.handleSearch}
          />
        </div>
        {isAdmin && (
          <button type="button" onClick={this.handleAdd}>
            Add New Category
          </button>
        )}
        <div id="categories">
          {categories.map(category => (
            <div key={category.id} className="category">
              <input
                name="category-selected"
                type="checkbox"
                value={category.id}
                checked={this.state.categories.includes(category.id.toString())}
                onChange={this.updateCategorySelected}
              />
              {category.name}
              {isAdmin && (
                <Link
                  to={`/categories/${category.id}/edit`}
                  params={{category}}
                >
                  <button type="button">Edit</button>
                </Link>
              )}
            </div>
          ))}
          <div>
            <input
              name="inStock"
              type="checkbox"
              onChange={this.handleInStock}
              checked={this.state.inStock}
            />In Stock
          </div>
          {/* <label htmlFor="inStock">In stock</label> */}
        </div>
        <select name="sort" onChange={this.handleSort}>
          {/* <option value="name_0" selected={this.state.sort === ''} /> */}
          <option value="name_0" selected={this.state.sort === 'name_0'}>
            Name (A to Z)
          </option>
          <option value="name_1" selected={this.state.sort === 'name_1'}>
            Name (Z to A)
          </option>
          <option value="price_0" selected={this.state.sort === 'price_0'}>
            Price (low to high)
          </option>
          <option value="price_1" selected={this.state.sort === 'price_1'}>
            Price (Z to A)
          </option>
          <option
            value="avgrating_0"
            selected={this.state.sort === 'avgrating_0'}
          >
            Avg. rating (low to high)
          </option>
          <option
            value="avgrating_1"
            selected={this.state.sort === 'avgrating_1'}
          >
            Avg. rating (high to low)
          </option>
          <option
            value="numratings_0"
            selected={this.state.sort === 'numratings_0'}
          >
            # ratings (low to high)
          </option>
          <option
            value="numratings_1"
            selected={this.state.sort === 'numratings_1'}
          >
            # ratings (high to low)
          </option>
        </select>
      </div>
    )
  }
}

const mapState = (state, props) => {
  return {
    products: state.products,
    categories: state.categories,
    activeCategories: state.activeCategories,
    isAdmin: state.user && state.user.role === 'admin'
  }
}

const mapDispatch = {fetchAllCategories, fetchProducts, fetchCategory}

export default withRouter(connect(mapState, mapDispatch)(Categories))
