import { createSelector } from "reselect";
import { InitialCartStateType } from "./cart.reducer";
import { CartItem } from "./cart.types";
import { RootState } from "../store";

export const selectCartReducer = (state: RootState): InitialCartStateType =>
  state.cart;

export const selectCart = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cart
);

export const selectCartCount = createSelector([selectCart], (cart) =>
  cart.reduce((count: number, item: CartItem) => {
    return count + (item.quantity ?? 0);
  }, 0)
);

export const selectTotalPrice = createSelector([selectCart], (cart) =>
  cart.reduce((total: number, item: CartItem) => {
    const itemQuantity = item.quantity ?? 0;
    return total + item.price * itemQuantity;
  }, 0)
);

export const selectShippingPrice = createSelector(
  [selectTotalPrice],
  (totalPrice) => {
    const shippingPercentage = 0.2;
    const shipping = totalPrice < 50 ? totalPrice * shippingPercentage : 0;
    return shipping;
  }
);
