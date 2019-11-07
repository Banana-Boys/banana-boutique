import React from 'react'
import {connect} from 'react-redux'
import {createReview} from '../store/reviews'

class NewReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      rating: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.createReview(
      this.props.match.params.id,
      this.state,
      this.props.history
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select name="rating" onChange={this.handleChange}>
            <option> </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          {this.state.rating.length > 0 ? null : (
            <div>Please rate the product</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea name="body" onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = {createReview}

export default connect(null, mapDispatchToProps)(NewReviewForm)
