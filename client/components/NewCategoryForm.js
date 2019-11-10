import React, {Component} from 'react'
import {sendCategory} from '../store/singleCategory'
import {connect} from 'react-redux'

export class NewCategoryForm extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const categoryName = event.target.categoryName.value
    this.props.submitCategory({
      name: categoryName
    })
  }

  render() {
    return (
      <form id="new-category-form" onSubmit={this.handleSubmit}>
        <div>
          <input
            type="text"
            name="categoryName"
            placeholder="Enter a category name..."
          />
          <span>
            <button type="submit">Create Category</button>
          </span>
        </div>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  submitCategory: category => dispatch(sendCategory(category))
})

export default connect(null, mapDispatch)(NewCategoryForm)
