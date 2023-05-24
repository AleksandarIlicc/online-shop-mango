import { CART_ACTION_TYPES } from "./cart.types";
import { Product } from "../products/products.types";
import { SetItemToCartType } from "./cart.action";

export type InitialCartStateType = {
  cart: Product[];
};

const INITIAL_CART_STATE: InitialCartStateType = {
  cart: [],
};

export const cartReducer = (
  state = INITIAL_CART_STATE,
  action: SetItemToCartType
): InitialCartStateType => {
  switch (action.type) {
    case CART_ACTION_TYPES.CART_SET_ITEM:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
