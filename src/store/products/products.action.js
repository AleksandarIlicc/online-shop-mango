import { createAction } from "../../utils/reducer.utils";
import { PRODUCTS_ACTION_TYPES } from "./products.types";

export const fetchProductsStart = () =>
  createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_START);

export const fetchProductsSuccess = (productsArray) =>
  createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_SUCCESS, productsArray);

export const fetchProductsError = (error) =>
  createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_ERROR, error);
