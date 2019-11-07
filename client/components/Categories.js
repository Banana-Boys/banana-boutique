import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../store/categories'
import {fetchFilteredProducts} from '../store/products'

export class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = this.buildInitialState()
  }

  buildInitialState() {
    return {
      checkedCategories: []
    }
  }

  async componentDidMount() {
    try {
      await this.props.loadCategories()
      //await this.props.updateProducts()
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
    //console.log('this.state:', this.state)

    this.props.updateProducts(this.state.checkedCategories)
  }

  render() {
    let categories = this.props.categories

    return (
      <div>
        {categories.map(category => (
          <div key={category.id} className="category">
            <input
              name="category-selected"
              type="checkbox"
              onChange={this.updateCategorySelected}
              value={category.id}
            />
            {category.name}
          </div>
        ))}
      </div>
    )
  }
}

const mapState = (state, props) => {
  return {
    products: state.products,
    categories: state.categories
  }
}

const mapDispatch = dispatch => ({
  loadCategories: () => dispatch(fetchAllCategories()),
  updateProducts: categoryIds =>
    dispatch(fetchFilteredProducts(categoryIds, null))
})

export default connect(mapState, mapDispatch)(Categories)
