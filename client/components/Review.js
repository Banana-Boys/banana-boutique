import React from 'react'
import {Button} from 'semantic-ui-react'

const Review = props => {
  const review = props.review
  //console.log('review', props)
  //const user = props.fetchUser(review.userId)
  //console.log(user)
  return (
    <div>
      <div>
        <Button
          type="button"
          onClick={() => {
            props.deleteReview(review)
          }}
        >
          Delete
        </Button>
        <button type="button">Edit</button>
        <h5>Rating: {review.rating}</h5>
        <h5>Title: {review.title}</h5>
        <h5>Description: {review.body}</h5>
        {/* <h6>Author: </h6> */}
      </div>
    </div>
  )
}

export default Review
