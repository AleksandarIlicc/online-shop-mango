import { AnyAction } from "redux";

import { setItemToCart } from "./cart.action";
import { CartItem } from "./cart.types";

export type InitialCartStateType = {
  cart: CartItem[];
};

const INITIAL_CART_STATE: InitialCartStateType = {
  cart: [],
};

export const cartReducer = (
  state = INITIAL_CART_STATE,
  action: AnyAction
): InitialCartStateType => {
  if (setItemToCart.match(action)) {
    return { ...state, cart: action.payload };
  }
  return state;
};
