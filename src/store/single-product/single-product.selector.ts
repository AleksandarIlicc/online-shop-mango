import { createSelector } from "reselect";
import { InitialSingleProductStateType } from "./single-product.reducer";
import { RootState } from "../store";

const selectSingleProductReducer = (
  state: RootState
): InitialSingleProductStateType => state.singleProduct;

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
