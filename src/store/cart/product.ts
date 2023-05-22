import { combineReducers } from "redux";
import {RootState} from "../..";
import {ProductsType} from "../action";
import {ADD_TO_CART, RECEIVE_PRODUCTS} from "./constants";

interface ProductsAction {
  type: typeof ADD_TO_CART | typeof RECEIVE_PRODUCTS;
  products: ProductsType[];
  productId: number;
}

interface ByidState {

  [key:number]: ProductsType;
 }
export const products = (state: ProductsType, action: ProductsAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1,
      };
    default:
      return state;
  }
};

const byId = (state: ByidState = {}, action: ProductsAction) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product;
          return obj;
        }, {} as {[key:number]: ProductsType}),
      };
    default:
      if (action.productId) {
        return {
          ...state,
          [action.productId]: products(state[action.productId], action),
        };
      }
      return state;
  }
};

const visibleIds = (state:number[] = [], action: ProductsAction) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map((product) => product.id);
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  visibleIds,
});

export const getProduct = (state:RootState["product"], id:number) => state.byId[id];

export const getVisibleProducts =  (state:RootState["product"]) =>
  state.visibleIds.map((id) => getProduct(state, id));
