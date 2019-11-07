import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postReview, destroyReview, updateReview} from '../store/reviews'
import Review from './Review'
import {Link, withRouter} from 'react-router-dom'

export class Reviews extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const reviews = this.props.reviews || []
    return (
      <div>
        <Link to={`/products/${this.props.match.params.id}/reviews/new`}>
          <button type="button">Add Review</button>
        </Link>
        <div>
          {reviews.map(rev => (
            <Review
              key={rev.id}
              destroyReview={this.props.destroyReview}
              review={rev}
              fetchUser={this.props.fetchUser}
            />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  reviews: state.reviews
})

const mapDispatchToProps = {postReview, destroyReview, updateReview}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reviews))
