import axios from 'axios'

//action types
const SET_CART = 'SET_CART'
const ADD_CART_LINE_ITEM = 'ADD_CART_LINE_ITEM'
const REMOVE_CART_LINE_ITEM = 'REMOVE_CART_LINE_ITEM'
const EDIT_CART_LINE_ITEM = 'EDIT_CART_LINE_ITEM'

//action creators
const setCart = cart => ({type: SET_CART, cart})
const addCartLineItem = cartLineItem => ({
  type: ADD_CART_LINE_ITEM,
  cartLineItem
})
const removeCartLineItem = productId => ({
  type: REMOVE_CART_LINE_ITEM,
  productId
})
const editCartLineItem = (productId, quantity) => ({
  type: EDIT_CART_LINE_ITEM,
  productId,
  quantity
})

//intialState
const initialState = []

//thunks

export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      return dispatch(setCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const sendAddCartLineItem = (productId, quantity, history) => {
  return async dispatch => {
    try {
      const cartLineItem = {productId, quantity}
      await axios.post('/api/cart', cartLineItem)
      dispatch(addCartLineItem(cartLineItem))
      history.push('/cart')
    } catch (error) {
      console.error(error)
    }
  }
}

export const sendRemoveCartLineItem = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/cart/${productId}`)
      dispatch(removeCartLineItem(productId))
    } catch (error) {
      console.error(error)
    }
  }
}

export const sendEditCartLineItem = (productId, quantity) => {
  return async dispatch => {
    try {
      await axios.put(`/api/cart/${productId}`, {quantity})
      dispatch(editCartLineItem(productId, quantity))
    } catch (error) {
      console.error(error)
    }
  }
}

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart
    case ADD_CART_LINE_ITEM: {
      const sameProduct = state.find(
        cartLineItem => cartLineItem.id === action.cartLineItem.id
      )
      if (sameProduct) {
        return [
          ...state.filter(
            cartLineItem => cartLineItem.id !== action.cartLineItem.id
          ),
          {
            ...action.cartLineItem,
            quantity: action.cartLineItem.quantity + sameProduct.quantity
          }
        ]
      } else {
        return [...state, action.cartLineItem]
      }
    }
    case REMOVE_CART_LINE_ITEM:
      return state.filter(
        cartLineItem => cartLineItem.productId !== action.productId
      )
    case EDIT_CART_LINE_ITEM:
      return [
        ...state.filter(
          cartLineItem => cartLineItem.productId !== action.productId
        ),
        {productId: action.productId, quantity: action.quantity}
      ]
    default:
      return state
  }
}
