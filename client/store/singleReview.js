import axios from 'axios'

const SET_REVIEW = 'SET_REVIEW'
const REMOVE_REVIEW = 'REMOVE_REVIEW'
const UPDATE_REVIEW = 'UPDATE_REVIEW'

const setReview = review => ({type: SET_REVIEW, review})
const removeReview = review => ({type: REMOVE_REVIEW, review})
const updateRev = review => ({type: UPDATE_REVIEW, review})

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
export default (review = {}, action) => {
  switch (action.type) {
    case SET_REVIEW:
      return action.review
    case REMOVE_REVIEW:
      return review
    default:
      return review
  }
}
