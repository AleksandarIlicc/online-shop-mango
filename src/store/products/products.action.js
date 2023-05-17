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
  createAction(
    PRODUCTS_ACTION_TYPES.PRODUCTS_SEARCH_AND_FILTER,
    filteredProducts
  );

const filterProductsByPriceAction = (filteredProducts) =>
  createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_SORT, filteredProducts);

const sortProductsAction = (sortedProducts) =>
  createAction(PRODUCTS_ACTION_TYPES.PRODUCTS_SORT, sortedProducts);

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
  dispatch(fetchProductsStart());

  try {
    const products = await getProductsAndDocument("products");

    if (query) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      dispatch(searchProductsAction(filteredProducts));
    } else {
      dispatch(fetchProductsSuccess(products));
    }
  } catch (error) {
    dispatch(fetchProductsError(error));
  }
};

export const filterProductsByPrice = (price) => async (dispatch) => {
  dispatch(fetchProductsStart());
  let filteredProducts = [];

  try {
    const products = await getProductsAndDocument("products");

    if (price !== "") {
      const [minPrice, maxPrice] = price.split("-");

      filteredProducts = products.filter(
        (product) =>
          product.price >= parseInt(minPrice) &&
          product.price <= parseInt(maxPrice)
      );
    }

    dispatch(filterProductsByPriceAction(filteredProducts));
  } catch (error) {
    dispatch(fetchProductsError(error));
  }
};

export const sortProducts = (sortBy) => async (dispatch) => {
  dispatch(fetchProductsStart());
  let sortedProducts = [];

  try {
    const products = await getProductsAndDocument("products");

    if (sortBy === "lowest") {
      sortedProducts = products.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "highest") {
      sortedProducts = products.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "name-a") {
      sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === "name-z") {
      sortedProducts = products.sort((a, b) => b.name.localeCompare(a.name));
    }

    dispatch(sortProductsAction(sortedProducts));
  } catch (error) {
    dispatch(fetchProductsError(error));
  }
};
