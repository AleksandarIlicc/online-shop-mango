import { createSelector } from "reselect";

const selectProductsReducer = (state) => state.products;

export const selectProducts = createSelector(
  [selectProductsReducer],
  (productsSlice) => {
    return productsSlice.products;
  }
);

export const selectProductsMap = createSelector([selectProducts], (products) =>
  products.reduce((acc, product) => {
    const { title, items } = product;
    acc[title.toLowerCase()] = items;

    return acc;
  }, {})
);

export const selectProductsLoading = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.isLoading
);

export const selectProductsError = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.error
);
