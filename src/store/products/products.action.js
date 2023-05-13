import { getProductsAndDocument } from "../../utils/firebase.utils";
import { createAction } from "../../utils/reducer.utils";
import { PRODUCTS_ACTION_TYPES } from "./products.types";

const fetchProductsStart = () =>
  createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_START);

const fetchProductsSuccess = (productsArray) =>
  createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_SUCCESS, productsArray);

const fetchProductsError = (error) =>
  createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_ERROR, error);

export const fetchProductsAsync = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const productsArray = await getProductsAndDocument("products");
    dispatch(fetchProductsSuccess(productsArray));
  } catch (error) {
    dispatch(fetchProductsError(error));
  }
};
