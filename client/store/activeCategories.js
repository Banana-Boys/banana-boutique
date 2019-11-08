import axios from 'axios'

/**
 * ACTION TYPES
 */
const ACTIVE_CATEGORIES = 'ACTIVE_CATEGORIES'

/**
 * INITIAL STATE
 */
const defaultCategories = []

/**
 * ACTION CREATORS
 */
const activateCategories = categoryIds => ({
  type: ACTIVE_CATEGORIES,
  categoryIds
})

/**
 * THUNK CREATORS
 */

export const filterCategories = categoryIds => dispatch => {
  dispatch(activateCategories(categoryIds))
}

/**
 * REDUCER
 */
export default function(state = defaultCategories, action) {
  switch (action.type) {
    case ACTIVE_CATEGORIES:
      return action.categoryIds
    default:
      return state
  }
}
