import axios from 'axios'

//action types
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const SELECT_PRODUCTS = 'SELECT_PRODUCTS'

//action creators
const getProducts = products => ({type: GET_PRODUCTS, products})
const addProduct = product => ({type: ADD_PRODUCT, product})
const deleteProduct = product => ({type: DELETE_PRODUCT, product})
const selectedProducts = products => ({type: SELECT_PRODUCTS, products})

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

export const fetchFilteredProducts = (
  categoryIds,
  searchTerms
) => async dispatch => {
  try {
    const response = await axios.get('/api/products', {
      params: {categoryIds: categoryIds, searchTerms: searchTerms}
    })
    dispatch(selectedProducts(response.data))
  } catch (err) {
    console.error(err)
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
    case SELECT_PRODUCTS:
      return action.products
    default:
      return products
  }
}
