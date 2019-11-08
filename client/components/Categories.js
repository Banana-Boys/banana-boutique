import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../store/categories'
import {filterCategories} from '../store/activeCategories'
import {fetchCategory} from '../store/singleCategory'
import {fetchFilteredProducts} from '../store/products'
import {Link} from 'react-router-dom'
import NewCategoryForm from './NewCategoryForm'

export class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = this.buildInitialState()
    this.handleEdit = this.handleEdit.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  buildInitialState() {
    return {
      checkedCategories: [],
      editCategory: {}
    }
  }

  async componentDidMount() {
    try {
      await this.props.loadCategories()
      this.setState()
    } catch (error) {
      console.error(error)
    }
  }

  updateCategorySelected = event => {
    let catId = Number(event.target.value)
    let index = this.state.checkedCategories.indexOf(catId)
    if (index >= 0) {
      this.state.checkedCategories.splice(index, 1)
    } else {
      this.state.checkedCategories.push(catId)
    }
    this.props.filterCats(this.state.checkedCategories)
    this.props.updateProducts(this.state.checkedCategories)
  }

  handleEdit(event) {
    event.preventDefault()
    console.log('this.props.category.id', this.props.category.id)
    this.props.gotoCategory(this.props.category.id)
  }

  handleAdd() {}

  render() {
    let categories = this.props.categories

    return (
      <div>
        <div>
          <NewCategoryForm />
        </div>
        {categories.map(category => (
          <div key={category.id} className="category">
            <input
              name="category-selected"
              type="checkbox"
              value={category.id}
              onChange={this.updateCategorySelected}
            />
            {category.name}
            <Link to={`/categories/${category.id}/edit`} params={{category}}>
              <button type="button">Edit</button>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = (state, props) => {
  return {
    products: state.products,
    categories: state.categories,
    activeCategories: state.activeCategories
  }
}

const mapDispatch = dispatch => ({
  loadCategories: () => dispatch(fetchAllCategories()),
  updateProducts: categoryIds => dispatch(fetchFilteredProducts(categoryIds)),
  filterCats: categoryIds => dispatch(filterCategories(categoryIds)),
  gotoCategory: id => dispatch(fetchCategory(id))
})

export default connect(mapState, mapDispatch)(Categories)
