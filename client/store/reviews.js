import axios from 'axios'
import {fetchProduct} from './singleProduct'
// import addReviewToProduct from './singleProduct'

//action types
const SET_REVIEWS = 'SET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'
const REMOVE_REVIEW = 'REMOVE_REVIEW'
const UPDATE_REVIEW = 'UPDATE_REVIEW'
const PRODUCT_REVIEWS = 'PRODUCT_REVIEWS'
const GET_MAKER = 'GET_MAKER'
const GET_REVIEWS = 'GET_REVIEWS'

//action creators
const setReviews = reviews => ({type: SET_REVIEWS, reviews})
const addReview = review => ({type: ADD_REVIEW, review})
const removeReview = reviewId => ({type: REMOVE_REVIEW, reviewId})
const updateReview = review => ({type: UPDATE_REVIEW, review})
const getMaker = user => ({type: GET_MAKER, user})
const getReviews = reviews => ({type: GET_REVIEWS, reviews})

//thunks
export const fetchProductReviews = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}/reviews/`)
      dispatch(setReviews(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const createReview = (productId, review, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(
        `/api/products/${productId}/reviews`,
        review
      )
      dispatch(addReview(data))
      history.push(`/products/${productId}`)
    } catch (error) {
      console.error(error)
    }
  }
}

export const destroyReview = (productId, reviewId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}/reviews/${reviewId}`)
      dispatch(removeReview(reviewId))
      dispatch(fetchProduct(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const editReview = (productId, review, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/products/${productId}/reviews/${review.id}`,
        review
      )
      dispatch(updateReview(data))
      dispatch(fetchProduct(productId))
      history.push(`/products/${productId}`)
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchReviewUser = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/reviews/user/${userId}`)
      dispatch(getMaker(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchUserReviews = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/reviews`)
      dispatch(getReviews(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer
export default (reviews = [], action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return action.reviews
    case PRODUCT_REVIEWS:
      return action.reviews
    case ADD_REVIEW:
      return [...reviews, action.review]
    case GET_MAKER:
      return action.user
    case REMOVE_REVIEW:
      return reviews.filter(review => review.id !== action.reviewId)
    case UPDATE_REVIEW:
      return reviews.map(
        review => (review.id === action.review.id ? action.review : review)
      )
    case GET_REVIEWS:
      return action.reviews
    default:
      return reviews
  }
}
