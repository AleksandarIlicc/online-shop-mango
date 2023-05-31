import { createSelector } from "reselect";
import { RootState } from "../store";
import { InitialProductsStateType } from "./products.reducer";

const selectProductsReducer = (state: RootState): InitialProductsStateType =>
  state.products;

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

export const selectProductsPerPage = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.productsPerPage
);
export const selectPaginationPage = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.paginationPage
);
