/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../store/categories'
import {fetchProducts} from '../store/products'
import {withRouter, Link} from 'react-router-dom'
import {queryParser} from '../../utilFrontEnd/queryParser'
import {queryPusher} from '../../utilFrontEnd/queryPusher'
import {fetchCategory} from '../store/singleCategory'
import NewCategoryForm from './NewCategoryForm'
import {
  Input,
  Button,
  Form,
  Item,
  Grid,
  Container,
  Select
} from 'semantic-ui-react'

export class Queries extends Component {
  constructor(props) {
    super(props)
    const query = queryParser(this.props.location.search)
    const {categories, search, inStock, sort, numPerPage} = query
    this.state = {
      categories: categories || [],
      search: search || '',
      inStock: Boolean(inStock) || false,
      sort: sort || '',
      editCategory: {},
      isAdmin: '',
      page: Number(this.props.location.hash.slice(1)) || 1,
      numPerPage: numPerPage || 10,
      lastPage: 1,
      numProducts: 0
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleInStock = this.handleInStock.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    this.props.fetchAllCategories()
    const {lastPage, numProducts} = await this.props.fetchProducts(this.state)
    this.setState({lastPage, numProducts})
  }

  updateCategorySelected = async event => {
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
    const {lastPage, numProducts} = await this.props.fetchProducts(newState)
    this.setState({lastPage, numProducts})
    queryPusher(newState, this.props)
  }

  async handleSearch(e) {
    const newState = {...this.state, search: e.target.value}
    this.setState(newState)
    const lastPage = await this.props.fetchProducts(newState)
    queryPusher(newState, this.props)
    this.setState(lastPage)
  }

  async handleInStock() {
    const newState = {...this.state, inStock: !this.state.inStock}
    this.setState(newState)
    const {lastPage, numProducts} = await this.props.fetchProducts(newState)
    queryPusher(newState, this.props)
    this.setState({lastPage, numProducts})
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
    this.props.gotoCategory(this.props.category.id)
  }

  handleClick(e) {
    e.persist()
    let page
    if (e.target.id === 'prevPage') {
      page = Math.max(this.state.page - 1, 1)
    } else if (e.target.id === 'firstPage') {
      page = 1
    } else if (e.target.id === 'nextPage') {
      page = Math.min(this.state.page + 1, this.state.lastPage)
    } else {
      page = this.state.lastPage
    }
    this.setState({page})
    this.props.fetchProducts({...this.state, page})
    this.props.history.push({
      hash: `#${page}`,
      search: this.props.location.search
    })
  }

  async handleChange(e) {
    e.persist()
    const newState = {...this.state, numPerPage: e.target.value}
    const {lastPage, numProducts} = await this.props.fetchProducts(newState)
    this.setState({...newState, lastPage, numProducts})
    queryPusher(newState, this.props)
  }

  handleAdd() {}

  render() {
    let categories = this.props.categories
    const isAdmin = this.props.user.role

    return (
      <div id="products-side-menus">
        {isAdmin === 'admin' ? (
          <div id="products-admin-actions">
            <div id="submit-product-holder">
              <Link to="/products/new">
                <span>
                  <Button size="mini" type="submit">
                    Create Product
                  </Button>
                </span>
              </Link>
            </div>
            <div id="category">
              <label id="newcategorylabel" htmlFor="new-category" />
              <NewCategoryForm />
            </div>
          </div>
        ) : null}
        <div id="filters">
          <div id="search-bar">
            <label id="searchlabel" htmlFor="search">
              Search:{' '}
            </label>
            <Input
              type="text"
              id="search"
              value={this.state.search}
              onChange={this.handleSearch}
            />
          </div>
          <label id="categorylabel" htmlFor="categories">
            Categories:{' '}
          </label>
          <div id="categories">
            {categories.map(category => (
              <div key={category.id} className="category">
                <Input
                  name="category-selected"
                  type="checkbox"
                  value={category.id}
                  checked={this.state.categories.includes(
                    category.id.toString()
                  )}
                  onChange={this.updateCategorySelected}
                />{' '}
                {category.name}
                {this.props.user.role === 'admin' ? (
                  <Link
                    to={`/categories/${category.id}/edit`}
                    params={{category}}
                  >
                    <Button
                      size="mini"
                      type="button"
                      className="categoryeditbutton"
                    >
                      Edit
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            ))}
            <div id="instockcategory">
              <Input
                name="inStock"
                type="checkbox"
                onChange={this.handleInStock}
                checked={this.state.inStock}
              />{' '}
              In Stock
            </div>
            {/* <label htmlFor="inStock">In stock</label> */}
          </div>

          <select id="sort" name="sort" onChange={this.handleSort}>
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
              Price (low to high)
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
          <div id="paginationHolder">
            <div>
              Showing {(this.state.page - 1) * this.state.numPerPage + 1}-{Math.min(
                this.state.page * this.state.numPerPage + 1,
                this.state.numProducts
              )}{' '}
              of {this.state.numProducts}
            </div>
            <Button
              size="mini"
              type="button"
              id="firstPage"
              onClick={this.handleClick}
              disabled={this.state.page === 1}
            >
              {'<<'}
            </Button>
            <Button
              size="mini"
              type="button"
              id="prevPage"
              onClick={this.handleClick}
              disabled={this.state.page === 1}
            >
              {'<'}
            </Button>
            <span>{this.state.page}</span>
            <Button
              size="mini"
              type="button"
              id="nextPage"
              onClick={this.handleClick}
              disabled={this.state.page === this.state.lastPage}
            >
              {'>'}
            </Button>
            <Button
              size="mini"
              type="button"
              id="lastPage"
              onClick={this.handleClick}
              disabled={this.state.page === this.state.lastPage}
            >
              {'>>'}
            </Button>
          </div>
          <div>
            <label htmlFor="numPerPage"># products/page:</label>
            <select name="numPerPage" onChange={this.handleChange}>
              <option selected={Number(this.state.numPerPage) === 10}>
                10
              </option>
              <option selected={Number(this.state.numPerPage) === 20}>
                20
              </option>
              <option selected={Number(this.state.numPerPage) === 50}>
                50
              </option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state, props) => {
  return {
    user: state.user,
    products: state.products,
    categories: state.categories,
    activeCategories: state.activeCategories
  }
}

const mapDispatch = {fetchAllCategories, fetchProducts, fetchCategory}

export default withRouter(connect(mapState, mapDispatch)(Queries))
