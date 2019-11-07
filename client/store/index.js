import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import singleProduct from './singleProduct'
import review from './review'
import singlereview from './singleReview'
import cart from './cart'
import orders from './orders'
import singleOrder from './singleOrder'
import categories from './categories'
import addresses from './addresses'

const reducer = combineReducers({
  user,
  products,
  singleProduct,
  review,
  cart,
  orders,
  singleOrder,
  categories,
  singlereview,
  addresses
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './review'
export * from './cart'
export * from './products'
export * from './singleProduct'
export * from './orders'
export * from './singleOrder'
export * from './categories'
export * from './singlereview'
