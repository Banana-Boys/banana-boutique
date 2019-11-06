import axios from 'axios'

//action types
// const SET_CARTPRODUCTS = 'SET_CARTPRODUCTS'
const ADD_CART_LINE_ITEM = 'ADD_CART_LINE_ITEM'
// const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

//action creators
// const setCartProducts = products => ({type: SET_CARTPRODUCTS, products})
const addCartLineItem = cartLineItem => ({
  type: ADD_CART_LINE_ITEM,
  cartLineItem
})
// const removeProduct = product => ({type: REMOVE_FROM_CART, product})

//intialState
const initialState = {
  cart: []
}

//thunks

// export const fetchCart = () => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.get('/api/cartproduct')
//       return dispatch(setCartProducts(data))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

export const sendAddCartLineItem = (productId, quantity, history) => {
  return async dispatch => {
    try {
      const cartLineItem = {productId, quantity}
      dispatch(addCartLineItem(cartLineItem))
      await axios.post('/api/cart', cartLineItem)
      // const product = await axios.get(`/api/products/${productId}`)
      // const user = userId ? await axios.get(`/api/users/${userId}`) : null
      // const {data} = await axios.post('/api/cart', {productI})
      // return dispatch(addToCart(data))
      history.push('/cart')
    } catch (error) {
      console.error(error)
    }
  }
}

// export const destroyProductInCart = product => {
//   return async dispatch => {
//     try {
//       await axios.delete(`/api/cartproduct/${product.id}`, product)
//       return dispatch(removeProduct(product))
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    // case SET_CARTPRODUCTS:
    //   return {...state, cart: action.products}
    case ADD_CART_LINE_ITEM:
      return [...state, action.cartLineItem]
    // case REMOVE_FROM_CART:
    //   return {
    //     ...state,
    //     cart: [...state.cart.filter(prod => prod !== action.product)]
    //   }
    default:
      return state
  }
}
