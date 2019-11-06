import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllCategories, updateSelectedCategory} from '../store/categories'

export class Categories extends Component {
  async componentDidMount() {
    try {
      await this.props.loadCategories()
    } catch (error) {
      console.error(error)
    }
  }

  updateCategorySelected = event => {
    const categoryId = event.target.id
    const selected = event.target.value
    const stateUpdate = this.state.products.filter(product => {
      if (selected === true && product.id === categoryId) {
        return product
      }
    })
    this.setState(stateUpdate)
  }

  render() {
    let categories = this.props.categories

    return (
      <div>
        {categories.map(category => (
          <div key={category.id} className="category">
            <form className="filter">
              <label htmlFor="category-selected" />
              <input
                name="category-selected"
                type="checkbox"
                onChange={this.updateCategorySelected}
                value={category.selected}
              />
              {category.name}
            </form>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = (state, props) => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => ({
  loadCategories: () => dispatch(fetchAllCategories())
  // updateCategories: (id, selected) => dispatch(updateSelectedCategory(id, selected))
})

export default connect(mapState, mapDispatch)(Categories)
