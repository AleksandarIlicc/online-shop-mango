import { combineReducers } from "redux";
import { productsReducer } from "./products/products.reducer";

export const rootReducer = combineReducers({
  products: productsReducer,
});
