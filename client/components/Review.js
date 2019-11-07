import React from 'react'

const Review = props => {
  const review = props.review
  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => {
            props.deleteReview(review)
          }}
        >
          Delete
        </button>
        <button type="button">Edit</button>
        <h5>Rating: {review.rating}</h5>
        <h5>Title: {review.title}</h5>
        <h5>Description: {review.body}</h5>
        <h6>Author: {review.author}</h6>
      </div>
    </div>
  )
}

export default Review
