import { createSelector } from "reselect";

const selectSingleProductReducer = (state) => state.singleProduct;

export const selectSingleProduct = createSelector(
  [selectSingleProductReducer],
  (singleProductSlice) => singleProductSlice.product
);

export const selectSingleProductIsLoading = createSelector(
  [selectSingleProductReducer],
  (singleProductSlice) => singleProductSlice.isLoading
);

export const selectSingleProductError = createSelector(
  [selectSingleProductReducer],
  (singleProductSlice) => singleProductSlice.error
);
