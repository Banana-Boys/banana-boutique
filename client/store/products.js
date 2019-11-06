import axios from 'axios'

//action types
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

//action creators
const getProducts = products => ({type: GET_PRODUCTS, products})
const addProduct = product => ({type: ADD_PRODUCT, product})
const deleteProduct = product => ({type: DELETE_PRODUCT, product})

//thunks
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products') //looked cute, might change later
      return dispatch(getProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const postProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products', product) //looked cute, might change later
      return dispatch(addProduct(data))
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

//reducer
export default (products = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...products, action.product]
    case DELETE_PRODUCT:
      return [...products.filter(i => i !== action.product)]
    default:
      return products
  }
}
