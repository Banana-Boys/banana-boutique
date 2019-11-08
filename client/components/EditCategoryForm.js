import React from 'react'
import {connect} from 'react-redux'
import {editCategory, fetchCategory} from '../store/singleCategory'

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
    let category = this.props.category

    return (
      <form onSubmit={this.invokeOnSubmit}>
        <div className="form-group">
          <label htmlFor="name">Catergory Name: {category.name}</label>
          <input
            type="text"
            name="name"
            placeholder="New category name..."
            onChange={this.updateFormValue}
            value={this.state.formValues.name}
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({category, categories}) => ({
  category,
  categories
})
const mapDispatchToProps = {editCategory, fetchCategory}

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryForm)
