import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_ADDRESSES = 'SET_ADDRESSES'
const ADD_ADDRESS = 'ADD_ADDRESS'
const REMOVE_ADDRESS = 'DELETE_ADDRESS'
const EDIT_ADDRESS = 'EDIT_ADDRESS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const setAddresses = addresses => ({type: SET_ADDRESSES, addresses})
const addAddress = address => ({type: ADD_ADDRESS, address})
const removeAddress = addressId => ({type: REMOVE_ADDRESS, addressId})
export const editAddressOnAddresses = address => ({type: EDIT_ADDRESS, address})

/**
 * THUNK CREATORS
 */

export const fetchDistance = zip => async dispatch => {
  try {
    const {data} = await axios.get(`/api/addresses/distance/${zip}`)
    return data.distance
  } catch (error) {
    console.log(error)
  }
}

export const fetchAddresses = () => async dispatch => {
  try {
    const response = await axios.get('/api/addresses')
    dispatch(setAddresses(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const createAddress = (
  address,
  userId,
  appHistory
) => async dispatch => {
  try {
    const {data} = await axios.post('/api/addresses', address)
    dispatch(addAddress(data))
    appHistory.push(`/users/${userId}`)
  } catch (error) {
    console.log(error)
  }
}

export const deleteAddress = addressId => async dispatch => {
  try {
    console.log(addressId)
    await axios.delete(`/api/addresses/${addressId}`)
    dispatch(removeAddress(addressId))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ADDRESSES:
      return action.addresses
    case ADD_ADDRESS:
      return [...state, action.address]
    case REMOVE_ADDRESS:
      return state.filter(address => address.id !== action.addressId)
    case EDIT_ADDRESS:
      return state.map(
        address => (address.id === action.address.id ? action.address : address)
      )
    default:
      return state
  }
}
