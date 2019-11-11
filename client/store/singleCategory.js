import axios from 'axios'
import {addCategory} from './categories'

/**
 * ACTION TYPES
 */
const GET_CATEGORY = 'GET_CATEGORY'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'

/**
 * INITIAL STATE
 */
const defaultCategory = []

/**
 * ACTION CREATORS
 */
const getCategory = category => ({type: GET_CATEGORY, category})
const updatedCategory = category => ({type: UPDATE_CATEGORY, category})

/**
 * THUNK CREATORS
 */

export const fetchCategory = id => async dispatch => {
  try {
    const response = await axios.get(`/api/categories/${id}`)
    dispatch(getCategory(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const editCategory = (id, params) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/categories/${id}`, params)
    dispatch(updatedCategory(data))
  } catch (error) {
    console.log(error)
  }
}

export const sendCategory = category => async dispatch => {
  try {
    const {data: newCategory} = await axios.post('/api/categories', category)
    dispatch(addCategory(newCategory))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCategory, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return action.category
    case UPDATE_CATEGORY:
      return action.category
    default:
      return state
  }
}
