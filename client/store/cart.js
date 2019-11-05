import axios from 'axios'

//action types
const SET_CARTPRODUCTS = 'SET_CARTPRODUCTS'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

//action creators
const setCartProducts = products => ({type: SET_CARTPRODUCTS, products})
const addToCart = product => ({type: ADD_TO_CART, product})
const removeProduct = product => ({type: REMOVE_FROM_CART, product})

//intialState
const initialState = {
  cart: [],
  product: {}
}

//thunks

export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cartproduct')
      return dispatch(setCartProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const postCart = product => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cartproduct', product)
      return dispatch(addToCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const destroyProductInCart = product => {
  return async dispatch => {
    try {
      await axios.delete(`/api/cartproduct/${product.id}`, product)
      return dispatch(removeProduct(product))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {...state, cart: action.products}
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.product]}
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: [...state.cart.filter(prod => prod !== action.product)]
      }
    default:
      return state
  }
}
