import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_CART_STATE = {
  cart: [],
};

export const cartReducer = (state = INITIAL_CART_STATE, action) => {
  switch (action.type) {
    case CART_ACTION_TYPES.CART_SET_ITEM:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
