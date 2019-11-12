import React from 'react'
import {connect} from 'react-redux'
import {editReview} from '../store/reviews'
import {fetchReview} from '../store/review'
import {Login} from './auth-form'
import {Input, Button, Form, Item, Grid} from 'semantic-ui-react'

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
    return this.props.user.id === this.props.review.userId ||
      this.props.user.role === 'admin' ? (
      <form onSubmit={this.handleSubmit} id="new-edit-x-form">
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select name="rating" onChange={this.handleChange} required>
            <option selected={this.state.rating === ''}> </option>
            <option selected={this.state.rating === '1'}>1</option>
            <option selected={this.state.rating === '2'}>2</option>
            <option selected={this.state.rating === '3'}>3</option>
            <option selected={this.state.rating === '4'}>4</option>
            <option selected={this.state.rating === '5'}>5</option>
          </select>
          {/* {this.state.rating.length > 0 ? null : (
            <div>Please rate the product</div>
          )} */}
        </div>

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form-group">
          <Button
            size="mini"
            type="submit"
            color="blue"
            disabled={
              !this.state.title.length ||
              !this.state.body.length ||
              !this.state.rating.toString().length
            }
          >
            Submit
          </Button>
        </div>
      </form>
    ) : (
      <div>
        <div>You are not the correct user</div>
        <Login />
      </div>
    )
  }
}

const mapStateToProps = ({review, user}) => ({review, user})
const mapDispatchToProps = {editReview, fetchReview}

export default connect(mapStateToProps, mapDispatchToProps)(EditReviewForm)
