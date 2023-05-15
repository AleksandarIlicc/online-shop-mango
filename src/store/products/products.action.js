import { getProductsAndDocument } from "../../utils/firebase.utils";
import { createAction } from "../../utils/reducer.utils";
import { PRODUCTS_ACTION_TYPES } from "./products.types";

const fetchProductsStart = () =>
  createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_START);

const fetchProductsSuccess = (productsArray) =>
  createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_SUCCESS, productsArray);

const fetchProductsError = (error) =>
  createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_ERROR, error);

const searchProductsAction = (filteredProducts) =>
  createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_SEARCH, filteredProducts);

export const fetchProductsAsync = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const productsArray = await getProductsAndDocument("products");
    dispatch(fetchProductsSuccess(productsArray));
  } catch (error) {
    dispatch(fetchProductsError(error));
  }
};

export const searchProducts = (query) => async (dispatch) => {
  const products = await getProductsAndDocument("products");

  if (query) {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    dispatch(searchProductsAction(filteredProducts));
  } else {
    dispatch(fetchProductsSuccess(products));
  }
};
