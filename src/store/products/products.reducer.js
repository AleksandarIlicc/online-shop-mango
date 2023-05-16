import { PRODUCTS_ACTION_TYPES } from "./products.types";

const INITIAL_PRODUCTS_STATE = {
  products: [],
  isLoading: true,
  error: null,
};

export const productsReducer = (state = INITIAL_PRODUCTS_STATE, action) => {
  switch (action.type) {
    case PRODUCTS_ACTION_TYPES.PRODUCTS_START:
      return {
        ...state,
        isLoading: true,
      };
    case PRODUCTS_ACTION_TYPES.PRODUCTS_SUCCESS:
      return { ...state, isLoading: false, products: action.payload };
    case PRODUCTS_ACTION_TYPES.PRODUCTS_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case PRODUCTS_ACTION_TYPES.PRODUCTS_SEARCH:
      return { ...state,isLoading: false, products: action.payload };
    default:
      return state;
  }
};
