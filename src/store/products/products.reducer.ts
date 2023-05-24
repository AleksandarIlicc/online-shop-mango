import { PRODUCTS_ACTION_TYPES, Product } from "./products.types";
import { ProductsAction } from "./products.action";

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
  action: ProductsAction
): InitialProductsStateType => {
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
    case PRODUCTS_ACTION_TYPES.PRODUCTS_SEARCH_AND_FILTER:
      return { ...state, isLoading: false, products: action.payload };
    case PRODUCTS_ACTION_TYPES.PRODUCTS_FILTER_BY_PRICE:
      return { ...state, isLoading: false, products: action.payload };
    case PRODUCTS_ACTION_TYPES.PRODUCTS_SORT:
      return { ...state, isLoading: false, products: action.payload };
    default:
      return state;
  }
};
