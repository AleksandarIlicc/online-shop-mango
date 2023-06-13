import { combineReducers } from "redux";
import { productsReducer } from "./products/products.reducer";
import { singleProductReducer } from "./single-product/single-product.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  products: productsReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer,
  user: userReducer,
});
