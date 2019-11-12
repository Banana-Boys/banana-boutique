import axios from 'axios'
import {NEW_CATEGORY} from './singleCategory'
import {sorter} from '../../utilBackEnd/util'
/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'

/**
 * INITIAL STATE
 */
const defaultCategories = []

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({type: GET_CATEGORIES, categories})
export const addCategory = category => ({type: ADD_CATEGORY, category})

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
    case ADD_CATEGORY:
      return [...categories, action.category].sort(sorter('name_0'))
    default:
      return categories
  }
}
