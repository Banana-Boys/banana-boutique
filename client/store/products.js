import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_PRODUCTS = 'GET_PRODUCTS'
const getProducts = products => ({type: GET_PRODUCTS, products})

export const fetchProducts = dispatch => {
  return async () => {
    try {
      const res = await axios.get('/api/products') //looked cute, might change later
      dispatch(getProducts(res.data))
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * REDUCER
 */
export default (products = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return products
  }
}
