import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer.utils";
import { Product } from "../products/products.types";
import { SINGLE_PRODUCT_ACTION_TYPES } from "./single-product.types";

type FetchSingleProductStartType =
  Action<SINGLE_PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_START>;

type FetchSingleProductSuccessType = ActionWithPayload<
  SINGLE_PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_SUCCESS,
  Product
>;

type FetchSingleProductErrorType = ActionWithPayload<
  SINGLE_PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_ERROR,
  Error
>;

export type SingleProductActions =
  | FetchSingleProductStartType
  | FetchSingleProductSuccessType
  | FetchSingleProductErrorType;

export const fetchSingleProductStart = withMatcher(
  (): FetchSingleProductStartType =>
    createAction(SINGLE_PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_START)
);

export const fetchSingleProductSuccess = withMatcher(
  (product: Product): FetchSingleProductSuccessType =>
    createAction(SINGLE_PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_SUCCESS, product)
);

export const fetchSingleProductError = withMatcher(
  (error: Error): FetchSingleProductErrorType =>
    createAction(SINGLE_PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_ERROR, error)
);
