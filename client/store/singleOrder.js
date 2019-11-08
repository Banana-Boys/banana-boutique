import axios from 'axios'

const GET_ORDER = 'GET_ORDER'
const getOrder = order => ({type: GET_ORDER, order})

export const fetchOrder = orderId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/orders/${orderId}`) //looked cute, might change later
      dispatch(getOrder(res.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createOrder = order => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/orders', order)
      dispatch(getOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default (order = {}, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return order
  }
}
