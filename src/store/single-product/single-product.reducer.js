import { SINGLE_PRODUCT_ACTION_TYPES } from "./single-product.types";

const INITIAL_SINGLE_PRODUCT_STATE = {
  product: {},
  isLoading: true,
  error: null,
};

export const singleProductReducer = (
  state = INITIAL_SINGLE_PRODUCT_STATE,
  action
) => {
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
