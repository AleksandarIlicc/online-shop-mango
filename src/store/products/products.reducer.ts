import { Product } from "./products.types";

import { AnyAction } from "redux";

import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsError,
  searchProductsAction,
  filterProductsByPriceAction,
  sortProductsAction,
} from "./products.action";

export type InitialProductsStateType = {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
};

const INITIAL_PRODUCTS_STATE: InitialProductsStateType = {
  products: [],
  isLoading: true,
  error: null,
};

export const productsReducer = (
  state = INITIAL_PRODUCTS_STATE,
  action: AnyAction
): InitialProductsStateType => {
  if (fetchProductsStart.match(action)) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (fetchProductsSuccess.match(action)) {
    return { ...state, isLoading: false, products: action.payload };
  }
  if (fetchProductsError.match(action)) {
    return { ...state, isLoading: false, error: action.payload };
  }
  if (searchProductsAction.match(action)) {
    return { ...state, isLoading: false, products: action.payload };
  }
  if (filterProductsByPriceAction.match(action)) {
    return { ...state, isLoading: false, products: action.payload };
  }
  if (sortProductsAction.match(action)) {
    return { ...state, isLoading: false, products: action.payload };
  }
  return state;
};
