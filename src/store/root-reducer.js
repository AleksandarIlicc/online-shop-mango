import { combineReducers } from "redux";
import { productsReducer } from "./products/products.reducer";
import { singleProductReducer } from "./single-product/single-product.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
  products: productsReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer,
});
