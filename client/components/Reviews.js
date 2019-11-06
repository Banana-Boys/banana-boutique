import React, {Component} from 'react'
import {postReview, destroyReview, updateReview} from '../store/review'

export class Reviews extends Component {
  constructor() {
    super()
  }

  render() {
    //const reviews = this.props.reviews
    return (
      <div>
        {/*
            reviews.map(rev=>{<Review review={rev}>})
            */}
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

//export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
export default Reviews
