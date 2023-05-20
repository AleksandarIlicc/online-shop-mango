export enum PRODUCTS_ACTION_TYPES {
  PRODUCTS_START = "PRODUCTS_START",
  PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS",
  PRODUCTS_ERROR = "PRODUCTS_ERROR",
  PRODUCTS_SEARCH_AND_FILTER = "PRODUCTS_SEARCH_AND_FILTER",
  PRODUCTS_FILTER_BY_PRICE = "PRODUCTS_FILTER_BY_PRICE",
  PRODUCTS_SORT = "PRODUCTS_SORT",
}

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  category: string;
  brand: string;
  color: string;
  size: string[];
};
