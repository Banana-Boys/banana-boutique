import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
// const SELECT_CATEGORIES = 'SELECT_CATEGORIES'

/**
 * INITIAL STATE
 */
const defaultCategories = []

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({type: GET_CATEGORIES, categories})
// const selectedCategories = (categories) => ({type: SELECT_CATEGORIES, categories})

/**
 * THUNK CREATORS
 */

export const featchAllCategories = () => async dispatch => {
  try {
    const response = await axios.get('/categories')
    dispatch(getCategories(response.data))
  } catch (err) {
    console.error(err)
  }
}

// export const updateSelectedCategories = (categories) => async dispatch => {
//   try {
//     const response = await axios.put('/categories', categories)
//     dispatch(selectedCategories(response.data))
//   } catch (err){
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    // case SELECT_CATEGORIES:
    //   return state.categories.map(category => {
    //     if (category.id === action.category.id){
    //       category.selected = true
    //     }
    //     return category
    //   })
    default:
      return state
  }
}
