import { createSelector } from "reselect";

const selectProductsReducer = (state) => state.products;

export const selectProducts = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.products
);

export const selectProductsLoading = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.isLoading
);

export const selectProductsError = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.error
);
