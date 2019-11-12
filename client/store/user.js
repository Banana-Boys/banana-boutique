import axios from 'axios'
import history from '../history'
import {fetchAddresses} from './addresses'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
/**
 * THUNK CREATORS
 */

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    if (res.data) {
      dispatch(getUser(res.data))
      dispatch(fetchAddresses())
    } else {
      dispatch(getUser(defaultUser))
    }
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
    await axios.get('/api/cart/merge')
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    dispatch(fetchAddresses())
    if (res.data.resetPassword) {
      history.push('/passwordReset')
    } else if (history.location.pathname !== '/checkout') {
      history.push(`/users/${res.data.id}`)
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const editUser = (userId, user, appHistory) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${userId}`, user)
    dispatch(getUser(data))
    appHistory.push(`/users/${userId}`)
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`)
    dispatch(logout())
  } catch (error) {
    console.log(error)
  }
}

export const resetPassword = (
  userId,
  oldPassword,
  password,
  appHistory
) => async dispatch => {
  let res
  try {
    res = await axios.put(`/api/users/${userId}`, {
      oldPassword,
      password,
      resetPassword: false
    })
    dispatch(getUser(res.data))
    appHistory.push(`/home`)
  } catch (err) {
    dispatch(getUser({id: userId, error: err}))
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
