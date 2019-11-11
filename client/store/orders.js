import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_ORDERS = 'GET_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'

//action creators
const getOrders = orders => ({type: GET_ORDERS, orders})
const updateOrder = order => ({type: UPDATE_ORDER, order})

export const fetchAllOrders = query => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders', {params: query}) //looked cute, might change later
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
  console.log(order)
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/orders`, order)
    } catch (err) {
      console.log(err)
    }
  }
}

export const sendUpdateOrder = order => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orders/${order.id}`, order)
    dispatch(updateOrder(data))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default (orders = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case UPDATE_ORDER:
      return orders.map(order => {
        if (order.id === action.order.id) {
          return action.order
        } else {
          return order
        }
      })
    default:
      return orders
  }
}
