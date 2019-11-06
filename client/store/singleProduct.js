import axios from 'axios'

//action type
const GET_PRODUCT = 'GET_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

//action creator
const getProduct = product => ({type: GET_PRODUCT, product})
const deleteProduct = product => ({type: DELETE_PRODUCT, product})
const updootProduct = product => ({type: UPDATE_PRODUCT, product})

//thunk
export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`) //looked cute, might change later
      return dispatch(getProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`) //looked cute, might change later
      return dispatch(deleteProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${product.id}`, product)
      return dispatch(updootProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default (singleProduct = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case DELETE_PRODUCT:
      return singleProduct
    case UPDATE_PRODUCT:
      return action.product
    default:
      return singleProduct
  }
}
