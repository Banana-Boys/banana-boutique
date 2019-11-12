import React from 'react'
import {connect} from 'react-redux'
import {editCategory, fetchCategory} from '../store/singleCategory'
import {Input, Button, Form, Item, Grid} from 'semantic-ui-react'

class EditCategoryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.buildInitialState()
  }

  buildInitialState() {
    return {
      formValues: ''
    }
  }

  componentDidMount() {
    this.props.fetchCategory(this.props.match.params.id)
  }

  updateFormValue = event => {
    const fieldName = event.target.name
    const fieldValue = event.target.value
    const stateUpdate = {
      formValues: {
        ...this.state.formValues,
        [fieldName]: fieldValue
      }
    }
    this.setState(stateUpdate)
  }

  invokeOnSubmit = async event => {
    try {
      event.preventDefault()
      await this.props.editCategory(
        this.props.match.params.id,
        this.state.formValues
      )
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    let category = this.props.singleCategory

    return (
      <form onSubmit={this.invokeOnSubmit} id="new-edit-x-form">
        <div className="form-group">
          <label htmlFor="name">Category Name: {category.name}</label>
          <input
            type="text"
            name="name"
            placeholder="New category name..."
            onChange={this.updateFormValue}
            value={this.state.formValues.name}
            required
          />
        </div>
        <div className="form-group">
          <Button
            size="mini"
            type="submit"
            color="blue"
            disabled={!this.state.formValues.name}
          >
            Submit
          </Button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({singleCategory, categories}) => ({
  singleCategory,
  categories
})
const mapDispatchToProps = {editCategory, fetchCategory}

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryForm)
