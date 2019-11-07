import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_ORDERS = 'GET_ORDERS'
const getOrders = orders => ({type: GET_ORDERS, orders})

export const fetchAllOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders') //looked cute, might change later
      dispatch(getOrders(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchUserOrders = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/orders`) //looked cute, might change later
      dispatch(getOrders(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createOrder = (order, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/orders`, order)
      history.push(`/orders/${data.id}`)
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * REDUCER
 */
export default (orders = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return orders
  }
}
