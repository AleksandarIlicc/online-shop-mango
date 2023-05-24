import { SINGLE_PRODUCT_ACTION_TYPES } from "./single-product.types";
import { Product } from "../products/products.types";
import { ProductActions } from "./single-product.action";

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
  action: ProductActions
): InitialSingleProductStateType => {
  switch (action.type) {
    case SINGLE_PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_START:
      return { ...state, isLoading: true };
    case SINGLE_PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, product: action.payload };
    case SINGLE_PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
