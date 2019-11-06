import axios from 'axios'

const GET_PRODUCT = 'GET_PRODUCT'
const getProduct = product => ({type: GET_PRODUCT, product})

export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/products/${productId}`) //looked cute, might change later
      dispatch(getProduct(res.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createProduct = (body, history) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/products`, body)
    history.push(`/products/${data.id}`)
  } catch (error) {
    console.log(error)
  }
}

export const deleteProduct = (productId, history) => async dispatch => {
  try {
    await axios.delete(`/api/products/${productId}`)
    history.push(`/products`)
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default (singleProduct = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return singleProduct
  }
}
