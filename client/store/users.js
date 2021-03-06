import axios from 'axios'

const GET_USERS = 'GET_USERS'
const REMOVE = 'REMOVE'
const PROMOTE = 'PROMOTE'
const DEMOTE = 'DEMOTE'
const TRIGGER_PASSWORD_RESET = 'TRIGGER_PASSWORD_RESET'

const getUsers = users => ({type: GET_USERS, users})
const removeU = userId => ({type: REMOVE, userId})
const promoteUser = user => ({type: PROMOTE, user})
const demoteUser = user => ({type: DEMOTE, user})
const triggerPasswordReset = userId => ({type: TRIGGER_PASSWORD_RESET, userId})

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

export const promoteUserBoard = user => {
  return async dispatch => {
    try {
      user.role = 'admin'

      const {data} = await axios.put(`/api/users/${user.id}`, user)

      dispatch(promoteUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const demoteUserBoard = user => {
  return async dispatch => {
    try {
      user.role = 'user'
      const {data} = await axios.put(`/api/users/${user.id}`, user)
      dispatch(demoteUser(data))
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

export const sendTriggerReset = userId => async dispatch => {
  try {
    await axios.put(`/api/users/${userId}`, {
      resetPassword: true
    })
    dispatch(triggerPasswordReset(userId))
  } catch (err) {
    console.log(err)
  }
}

export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case PROMOTE:
      return [
        ...state.map(user => {
          if (user.id === action.user.id) {
            return action.user
          } else {
            return user
          }
        })
      ]
    case DEMOTE:
      return [
        ...state.map(user => {
          if (user.id === action.user.id) {
            return action.user
          } else {
            return user
          }
        })
      ]
    case REMOVE:
      return [...state.filter(user => user.id !== action.userId)]
    case TRIGGER_PASSWORD_RESET:
      console.log('triggered!')
      return [
        ...state.map(user => {
          if (user.id === action.userId) {
            user.passwordReset = true
            return user
          } else {
            return user
          }
        })
      ]
    default:
      return state
  }
}
