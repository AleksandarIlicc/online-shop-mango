import { createAction } from "../../utils/reducer.utils";
import { SINGLE_PRODUCT_ACTION_TYPES } from "./single-product.types";

export const fetchSingleProductStart = () =>
  createAction(SINGLE_PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_START);

export const fetchSingleProductSuccess = (product) =>
  createAction(SINGLE_PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_SUCCESS, product);

export const fetchSingleProductError = (error) =>
  createAction(SINGLE_PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_ERROR, error);
