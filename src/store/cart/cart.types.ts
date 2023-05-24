import { Product } from "../products/products.types";

export enum CART_ACTION_TYPES {
  CART_SET_ITEM = "CART_SET_ITEM",
}

export type CartItem = Product & { quantity: number };
