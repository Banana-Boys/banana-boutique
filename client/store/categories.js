import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const NEW_CATEGORY = 'NEW_CATEGORY'
/**
 * INITIAL STATE
 */
const defaultCategories = []

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({type: GET_CATEGORIES, categories})
const createCategory = category => ({type: NEW_CATEGORY, category})

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

export const sendCategory = category => async dispatch => {
  const {data: newCategory} = await axios.post('/api/categories', category)
  dispatch(createCategory(newCategory))
}

/**
 * REDUCER
 */
export default function(state = defaultCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    case NEW_CATEGORY:
      return action.category
    default:
      return state
  }
}
