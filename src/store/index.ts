import { combineReducers } from "redux";
import todo from "./todo/todo";
import cart from "./cart/cart";
import product from "./cart/product";

const rootReducer = combineReducers({
  todo,
  cart,
  product,
});

export default rootReducer;
