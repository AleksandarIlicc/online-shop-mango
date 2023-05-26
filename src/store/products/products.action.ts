import { getProductsAndDocument } from "../../utils/firebase.utils";
import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer.utils";
import { PRODUCTS_ACTION_TYPES, Product } from "./products.types";

import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../store";

type FetchProductsStartType = Action<PRODUCTS_ACTION_TYPES.PRODUCTS_START>;

type FetchProductsSuccessType = ActionWithPayload<
  PRODUCTS_ACTION_TYPES.PRODUCTS_SUCCESS,
  Product[]
>;

type FetchProductsErrorType = ActionWithPayload<
  PRODUCTS_ACTION_TYPES.PRODUCTS_ERROR,
  Error
>;

type SearchProductsActionType = ActionWithPayload<
  PRODUCTS_ACTION_TYPES.PRODUCTS_SEARCH_AND_FILTER,
  Product[]
>;

type FilterProductsByPriceActionType = ActionWithPayload<
  PRODUCTS_ACTION_TYPES.PRODUCTS_FILTER_BY_PRICE,
  Product[]
>;

type SortProductsActionType = ActionWithPayload<
  PRODUCTS_ACTION_TYPES.PRODUCTS_SORT,
  Product[]
>;

export type ProductsAction =
  | FetchProductsStartType
  | FetchProductsSuccessType
  | FetchProductsErrorType
  | SearchProductsActionType
  | FilterProductsByPriceActionType
  | SortProductsActionType;

export const fetchProductsStart = withMatcher(
  (): FetchProductsStartType =>
    createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_START)
);

export const fetchProductsSuccess = withMatcher(
  (productsArray: Product[]): FetchProductsSuccessType =>
    createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_SUCCESS, productsArray)
);

export const fetchProductsError = withMatcher(
  (error: Error): FetchProductsErrorType =>
    createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_ERROR, error)
);

export const searchProductsAction = withMatcher(
  (searchedProducts: Product[]): SearchProductsActionType =>
    createAction(
      PRODUCTS_ACTION_TYPES.PRODUCTS_SEARCH_AND_FILTER,
      searchedProducts
    )
);

export const filterProductsByPriceAction = withMatcher(
  (filteredProducts: Product[]): FilterProductsByPriceActionType =>
    createAction(
      PRODUCTS_ACTION_TYPES.PRODUCTS_FILTER_BY_PRICE,
      filteredProducts
    )
);

export const sortProductsAction = withMatcher(
  (sortedProducts: Product[]): SortProductsActionType =>
    createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_SORT, sortedProducts)
);

const applySearching =
  (query: string) =>
  (products: Product[]): Product[] =>
    query
      ? products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      : products;

const applyFilteringByPrice =
  (price: string) =>
  (products: Product[]): Product[] =>
    price
      ? products.filter((product) => {
          const [minPrice, maxPrice] = price.split("-");
          return (
            product.price >= parseInt(minPrice) &&
            product.price <= parseInt(maxPrice)
          );
        })
      : products;

const applySorting =
  (sortBy: string) =>
  (products: Product[]): Product[] => {
    const sortedProducts = [...products];

    switch (sortBy) {
      case "lowest":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "highest":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-a":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return sortedProducts;
  };

export const fetchProductsAsync =
  () =>
  async (dispatch: ThunkDispatch<RootState, undefined, ProductsAction>) => {
    dispatch(fetchProductsStart());

    try {
      const productsArray: Product[] = await getProductsAndDocument("products");
      dispatch(fetchProductsSuccess(productsArray));
    } catch (error) {
      dispatch(fetchProductsError(error));
    }
  };

export const searchProducts =
  (query: string) =>
  async (dispatch: ThunkDispatch<RootState, undefined, ProductsAction>) => {
    let searchedProducts = [] as Product[];

    dispatch(fetchProductsStart());

    try {
      const products = await getProductsAndDocument("products");

      if (query) {
        searchedProducts = applySearching(query)(products);

        dispatch(searchProductsAction(searchedProducts));
      } else {
        dispatch(fetchProductsSuccess(products));
      }
    } catch (error) {
      dispatch(fetchProductsError(error));
    }
  };

export const filterProductsByPrice =
  (price: string) =>
  async (dispatch: ThunkDispatch<RootState, undefined, ProductsAction>) => {
    let filteredProducts = [] as Product[];

    dispatch(fetchProductsStart());

    try {
      const products = await getProductsAndDocument("products");
      filteredProducts = applyFilteringByPrice(price)(products);

      dispatch(filterProductsByPriceAction(filteredProducts));
    } catch (error) {
      dispatch(fetchProductsError(error));
    }
  };

export const sortProducts =
  (sortBy: string) =>
  async (dispatch: ThunkDispatch<RootState, undefined, ProductsAction>) => {
    let sortedProducts = [] as Product[];

    dispatch(fetchProductsStart());

    try {
      const products = await getProductsAndDocument("products");
      sortedProducts = applySorting(sortBy)(products);

      dispatch(sortProductsAction(sortedProducts));
    } catch (error) {
      dispatch(fetchProductsError(error));
    }
  };
