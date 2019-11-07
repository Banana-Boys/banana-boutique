import axios from 'axios'
import {fetchProduct} from './singleProduct'

//action types
const SET_REVIEW = 'SET_REVIEW'

//action creators
const setReview = review => ({type: SET_REVIEW, review})

//thunks
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

//reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_REVIEW:
      return action.review
    default:
      return state
  }
}
