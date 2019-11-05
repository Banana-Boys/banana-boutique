import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import products from "./product";
import singleProduct from "./singleProduct";
import review from "./review";
import cart from "./cart";

const reducer = combineReducers({
  user,
  products,
  singleProduct,
  review,
  cart
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
export * from "./product";
export * from "./singleProduct";
export * from "./review";
export * from "./cart";
