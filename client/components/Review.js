import React from 'react'

const Review = props => {
  const review = props.review
  return (
    <div>
      <div>
        <h1>{review.rating}</h1>
        <h1>{review.title}</h1>
        <h2>{review.body}</h2>
      </div>
    </div>
  )
}

export default Review
