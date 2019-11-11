import React, {Component} from 'react'
import {sendCategory} from '../store/singleCategory'
import {connect} from 'react-redux'
import {Input, Button, Form, Item, Grid} from 'semantic-ui-react'

export class NewCategoryForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = this.buildInitialState()
    this.updateFormValue = this.updateFormValue.bind(this)
  }

  buildInitialState() {
    return {
      categoryName: ''
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const categoryName = event.target.categoryName.value
    this.props.submitCategory({
      name: categoryName
    })
  }

  updateFormValue = event => {
    const fieldName = event.target.name
    const fieldValue = event.target.value
    const stateUpdate = {
      [fieldName]: fieldValue
    }
    this.setState(stateUpdate)
    console.log(this.state)
  }

  render() {
    return (
      <form id="new-category-form" onSubmit={this.handleSubmit}>
        {/* <div id="category-form-holder"> */}
        <Input
          type="text"
          name="categoryName"
          placeholder="Create a new category..."
          value={this.state.categoryName}
          onChange={this.updateFormValue}
        />
        {/* </div> */}
        {this.state.categoryName.length > 0 ? (
          <div id="submit-category-holder">
            <span>
              <Button size="mini" type="submit" color="blue">
                Create Category
              </Button>
            </span>
          </div>
        ) : null}
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  submitCategory: category => dispatch(sendCategory(category))
})

export default connect(null, mapDispatch)(NewCategoryForm)
