import { Product } from "../products/products.types";
import { AnyAction } from "redux";
import {
  fetchSingleProductError,
  fetchSingleProductStart,
  fetchSingleProductSuccess,
} from "./single-product.action";

export type InitialSingleProductStateType = {
  readonly product: Product | {};
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_SINGLE_PRODUCT_STATE: InitialSingleProductStateType = {
  product: {},
  isLoading: true,
  error: null,
};

export const singleProductReducer = (
  state = INITIAL_SINGLE_PRODUCT_STATE,
  action: AnyAction
): InitialSingleProductStateType => {
  if (fetchSingleProductStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchSingleProductSuccess.match(action)) {
    return { ...state, isLoading: false, product: action.payload };
  }
  if (fetchSingleProductError.match(action)) {
    return { ...state, isLoading: false, error: action.payload };
  }
  return state;
};
