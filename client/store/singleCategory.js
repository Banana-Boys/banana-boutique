import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORY = 'GET_CATEGORY'

/**
 * INITIAL STATE
 */
const defaultCategory = []

/**
 * ACTION CREATORS
 */
const getCategory = category => ({type: GET_CATEGORY, category})

/**
 * THUNK CREATORS
 */

export const fetchCategory = id => async dispatch => {
  try {
    const response = await axios.get(`/api/categories/:${id}`)
    dispatch(getCategory(response.data))
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
    default:
      return state
  }
}
