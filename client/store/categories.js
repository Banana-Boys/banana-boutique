import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
// const SELECT_CATEGORY = 'SELECT_CATEGORY'

/**
 * INITIAL STATE
 */
const defaultCategories = []

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({type: GET_CATEGORIES, categories})
// const selectedCategory = (category) => ({type: SELECT_CATEGORY, category})

/**
 * THUNK CREATORS
 */

export const featchAllCategories = () => async dispatch => {
  try {
    const response = await axios.get('/api/categories')
    dispatch(getCategories(response.data))
  } catch (err) {
    console.error(err)
  }
}

// export const updateSelectedCategory = (id, selected) => dispatch => {
//   try {
//     const response = await axios.put(`/api/products/${id}`, selected)
//     dispatch(selectedCategory(response.data))
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
    // case SELECT_CATEGORY:
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
