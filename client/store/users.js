import axios from 'axios'

const GET_USERS = 'GET_USERS'
const REMOVE = 'REMOVE'

const getUsers = users => ({type: GET_USERS, users})
const removeU = userId => ({type: REMOVE, userId})

const defaultUsers = []

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users`)
      dispatch(getUsers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeUserFromBoard = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`)
    dispatch(removeU(userId))
  } catch (error) {
    console.log(error)
  }
}

export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      console.log('-GET_USERS-', action.users)
      return action.users
    case REMOVE:
      return state.filter(user => user.id !== action.userId)
    default:
      return state
  }
}
