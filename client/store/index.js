import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
<<<<<<< HEAD
import products from "./product";
import singleProduct from "./singleProduct";
import review from "./review";
import cart from "./cart";
=======
import products from "./products";
import singleProduct from "./singleProduct";
import orders from "./orders";
import singleOrder from "./singleOrder";
>>>>>>> a3bd2b498d9945ae6a2233674b2b729695726a7d

const reducer = combineReducers({
  user,
  products,
  singleProduct,
<<<<<<< HEAD
  review,
  cart
=======
  orders,
  singleOrder
>>>>>>> a3bd2b498d9945ae6a2233674b2b729695726a7d
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
<<<<<<< HEAD
export * from "./product";
export * from "./singleProduct";
export * from "./review";
export * from "./cart";
=======
export * from "./products";
export * from "./singleProduct";
export * from "./orders";
export * from "./singleOrder";
>>>>>>> a3bd2b498d9945ae6a2233674b2b729695726a7d
