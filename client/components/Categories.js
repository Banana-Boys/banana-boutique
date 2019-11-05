import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../store/categories'

export class Categories extends Component {
  async componentDidMount() {
    try {
      await this.props.loadCategories()
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    let categories = this.props.categories

    return (
      <form id="categories-form">
        <div>
          {categories.map(category => (
            <div key={category.id} id="category">
              <div>
                <input type="checkbox" />
                {category.name} - test
              </div>
            </div>
          ))}
          <br>
            <span>
              <button type="submit">Apply Filters</button>
            </span>
          </br>
        </div>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  loadCategories: () => dispatch(fetchAllCategories())
})

export default connect(null, mapDispatch)(Categories)
