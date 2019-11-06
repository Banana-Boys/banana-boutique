import axios from 'axios'

//action type
const GET_PRODUCT = 'GET_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

//action creator
const getProduct = product => ({type: GET_PRODUCT, product})
const deleteProduct = product => ({type: DELETE_PRODUCT, product})

//thunk
export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`) //looked cute, might change later
      dispatch(getProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createProduct = (body, history) => async dispatch => {
  try {
    const {data} = await axios.post('/api/products', body)
    history.push(`/products/${data.id}`)
  } catch (error) {
    console.log(error)
  }
}

export const editProduct = (id, body, history) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${id}`, body)
    console.log(data)
    history.push(`/products/${data.id}`)
  } catch (error) {
    console.log(error)
  }
}

export const removeProduct = (productId, history) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`) //looked cute, might change later
      history.push(`/products`)
      dispatch(deleteProduct(productId))
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * REDUCER
 */
export default (singleProduct = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case DELETE_PRODUCT:
      return singleProduct
    default:
      return singleProduct
  }
}
