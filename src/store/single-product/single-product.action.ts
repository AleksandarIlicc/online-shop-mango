import {
  Action,
  ActionWithPayload,
  createAction,
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

export type ProductActions =
  | FetchSingleProductStartType
  | FetchSingleProductSuccessType
  | FetchSingleProductErrorType;

export const fetchSingleProductStart = (): ProductActions =>
  createAction(SINGLE_PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_START);

export const fetchSingleProductSuccess = (product: Product): ProductActions =>
  createAction(SINGLE_PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_SUCCESS, product);

export const fetchSingleProductError = (error: Error): ProductActions =>
  createAction(SINGLE_PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_ERROR, error);
