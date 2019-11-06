import axios from 'axios'

//action types
const SET_REVIEWS = 'SET_REVIEWS'
const SET_REVIEW = 'SET_REVIEW'
const ADD_REVIEW = 'ADD_REVIEW'
const REMOVE_REVIEW = 'REMOVE_REVIEW'
const UPDATE_REVIEW = 'UPDATE_REVIEW'
const RATINGS_AVERAGE = 'RATINGS_AVERAGE'

//action creators
const setReviews = reviews => ({type: SET_REVIEWS, reviews})
const setReview = review => ({type: SET_REVIEW, review})
const addReview = review => ({type: ADD_REVIEW, review})
const removeReview = review => ({type: REMOVE_REVIEW, review})
const updateRev = review => ({type: UPDATE_REVIEW, review})
const ratingsAVG = rating => ({type: RATINGS_AVERAGE, rating})

//thunks
export const fetchReviews = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/reviews')
      return dispatch(setReviews(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchReviewsRatingsAverage = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/reviews/ratingsaverage')
      return dispatch(ratingsAVG(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchReview = reviewid => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/reviews/${reviewid}`)
      return dispatch(setReview(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const postReview = review => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/reviews', review)
      return dispatch(addReview(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const destroyReview = review => {
  return async dispatch => {
    try {
      await axios.delete(`/api/reviews/${review.id}`)
      return dispatch(removeReview(review))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateReview = review => {
  return async dispatch => {
    try {
      await axios.put(`/api/reviews/${review.id}`, review)
      dispatch(updateRev(review))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer
export default (reviews = [], action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return [action.reviews]
    case SET_REVIEW:
      return action.review
    case ADD_REVIEW:
      return [...reviews, action.review]
    case REMOVE_REVIEW:
      return [...reviews.filter(rev => rev !== action.review)]
    default:
      return reviews
  }
}
