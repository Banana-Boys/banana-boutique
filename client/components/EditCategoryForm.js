import React from 'react'
import {connect} from 'react-redux'
import {editCategory, fetchCategory} from '../store/singleCategory'

class EditCategoryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategory(this.props.match.params.id)
  }

  componentWillReceiveProps(newProps) {
    let {name} = newProps.category

    const newState = {
      name
    }
    this.setState(newState)
  }

  handleChange(e) {
    let value = e.target.value
    this.setState({[e.target.name]: value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const submitState = {
      ...this.state,
      name: this.state.name
    }

    this.props.editCategory(
      this.props.match.params.id,
      submitState,
      this.props.history
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="my category name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          {this.state.name.length > 0 ? null : <div>Name cannot be empty</div>}
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
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
