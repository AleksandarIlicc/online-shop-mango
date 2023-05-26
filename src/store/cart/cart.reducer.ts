import { Product } from "../products/products.types";

import { AnyAction } from "redux";

import { setItemToCart } from "./cart.action";

export type InitialCartStateType = {
  cart: Product[];
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
