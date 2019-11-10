import axios from 'axios'
import {NEW_CATEGORY} from './singleCategory'
/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'

/**
 * INITIAL STATE
 */
const defaultCategories = []

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({type: GET_CATEGORIES, categories})

/**
 * THUNK CREATORS
 */

export const fetchAllCategories = () => async dispatch => {
  try {
    const response = await axios.get('/api/categories')
    dispatch(getCategories(response.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function(categories = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    case NEW_CATEGORY:
      return [...categories, action.category]
    default:
      return categories
  }
}
