import {RootState} from "../..";
import { ADD_TO_CART, CHECKOUT_FAILURE, CHECKOUT_REQUEST } from "./constants";

interface CartType {
  addedIds: number[];
  quantityById: {
    [key: number]: number;
  };
}

interface CartAction {
  type: typeof CHECKOUT_REQUEST | typeof CHECKOUT_FAILURE | typeof ADD_TO_CART ;
  cart: CartType;
  productId: number;

}

const initState: CartType = {
  addedIds: [],
  quantityById: {},
};

const addedIds = (state = initState.addedIds, action: CartAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state;
      }
      return [...state, action.productId];
    default:
      return state;
  }
};

const quantityById = (
  state = initState.quantityById,
  action: CartAction
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        [action.productId]: (state[action.productId] || 0) + 1,
      };
    default:
      return state;
  }
};

const cart = (state = initState, action:CartAction) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initState;
    case CHECKOUT_FAILURE:
      return action.cart;
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
      };
  }
};

export const getQuantity = (state:RootState["cart"], productId:number) =>
  state.quantityById[productId] || 0

export const getAddedIds = (state:RootState["cart"]) => state.addedIds

export default cart;
