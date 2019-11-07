import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postReview, destroyReview, updateReview} from '../store/review'
import Review from './Review'

export class Reviews extends Component {
  constructor() {
    super()
  }

  render() {
    const reviews = this.props.revs || []
    return (
      <div>
        <div>
          {reviews.map(rev => (
            <Review
              key={rev.id}
              deleteReview={this.props.deleteReview}
              review={rev}
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

const mapDispatchToProps = dispatch => ({
  addReview: review => dispatch(postReview(review)),
  deleteReview: review => dispatch(destroyReview(review)),
  updateReview: review => dispatch(updateReview(review))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
