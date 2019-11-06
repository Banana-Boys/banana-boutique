import React from 'react'

const Review = props => {
  const review = props.review
  return (
    <div>
      <div>
        <h5>Rating: {review.rating}</h5>
        <h5>Title: {review.title}</h5>
        <h5>{review.body}</h5>
      </div>
    </div>
  )
}

export default Review
