import { createSelector } from "reselect";

export const selectCartReducer = (state) => state.cart;

export const selectCart = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cart
);

export const selectCartCount = createSelector([selectCart], (cart) =>
  cart.reduce((count, item) => {
    return count + item.quantity;
  }, 0)
);

export const selectTotalPrice = createSelector([selectCart], (cart) =>
  cart.reduce((total, item) => {
    return total + item.price * item.quantity;
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
