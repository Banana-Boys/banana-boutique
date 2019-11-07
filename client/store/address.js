import axios from 'axios'
import {editAddressOnAddresses} from './addresses'

//action type
const SET_ADDRESS = 'SET_ADDRESS'

//action creator
const setAddress = address => ({type: SET_ADDRESS, address})

//thunk
export const fetchAddress = addressId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/addresses/${addressId}`) //looked cute, might change later
      dispatch(setAddress(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const editAddress = (
  addressId,
  address,
  userId,
  history
) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/addresses/${addressId}`, address)
    dispatch(setAddress(data))
    dispatch(editAddressOnAddresses(data))
    history.push(`/users/${userId}`)
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default (state = {}, action) => {
  switch (action.type) {
    case SET_ADDRESS: {
      return action.address
    }
    default:
      return state
  }
}
