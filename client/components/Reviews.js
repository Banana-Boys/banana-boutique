import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postReview, destroyReview, updateReview} from '../store/review'
import Review from './Review'

export class Reviews extends Component {
  constructor() {
    super()
  }

  render() {
    const reviews = this.props.reviews || []
    console.log('reviews', reviews)
    return <div>{reviews.map(rev => <Review key={rev.id} review={rev} />)}</div>
  }
}

const mapStateToProps = state => ({
  revs: state.reviews
})

const mapDispatchToProps = dispatch => ({
  addReview: review => dispatch(postReview(review)),
  deleteReview: review => dispatch(destroyReview(review)),
  updateReview: review => dispatch(updateReview(review))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
//export default Reviews

//add number of reviews per product
//add average of ratings per product
