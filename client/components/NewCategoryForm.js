import React, {Component} from 'react'
import {sendCategory} from '../store/singleCategory'
import {connect} from 'react-redux'
import {Input, Button, Form, Item, Grid} from 'semantic-ui-react'

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
        {/* <div id="category-form-holder"> */}
        <Input
          type="text"
          name="categoryName"
          placeholder="Enter a category name..."
        />
        {/* </div> */}
        <div id="submit-category-holder">
          <span>
            <Button color="yellow" size="mini" type="submit">
              +Create Category
            </Button>
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
