import React from 'react'
import {Link} from 'react-router-dom'

const Review = props => {
  const review = props.review
  return (
    <div>
      <div>
        <p>Rating: {review.rating}</p>
        <p>Title: {review.title}</p>
        <p>Description: {review.body}</p>
        <p>Author: {review.user.name}</p>
        <button
          type="button"
          onClick={() => {
            props.destroyReview(review.productId, review.id)
          }}
        >
          Delete Review
        </button>
        <Link to={`/products/${review.productId}/reviews/${review.id}/edit`}>
          <button type="button">Edit Review</button>
        </Link>
      </div>
    </div>
  )
}

export default Review
