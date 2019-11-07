import React from 'react'
import {connect} from 'react-redux'
import {editReview} from '../store/reviews'
import {fetchReview} from '../store/review'

class EditReviewForm extends React.Component {
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

  componentDidMount() {
    this.props.fetchReview(this.props.match.params.reviewId)
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.review)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.editReview(
      this.props.match.params.productId,
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
            <option selected={this.state.rating === ''}> </option>
            <option selected={this.state.rating === '1'}>1</option>
            <option selected={this.state.rating === '2'}>2</option>
            <option selected={this.state.rating === '3'}>3</option>
            <option selected={this.state.rating === '4'}>4</option>
            <option selected={this.state.rating === '5'}>5</option>
          </select>
          {this.state.rating.length > 0 ? null : (
            <div>Please rate the product</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({review}) => ({review})
const mapDispatchToProps = {editReview, fetchReview}

export default connect(mapStateToProps, mapDispatchToProps)(EditReviewForm)