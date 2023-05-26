import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer.utils";
import { Product } from "../products/products.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

export type SetItemToCartType = ActionWithPayload<
  CART_ACTION_TYPES.CART_SET_ITEM,
  CartItem[]
>;

const addCartItem = (cart: CartItem[], productToAdd: Product) => {
  const existingItem = cart.find((item) => item.id === productToAdd.id);

  if (existingItem) {
    return cart.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: (item.quantity ?? 0) + 1 }
        : item
    );
  }
  return [...cart, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cart: CartItem[], productToRemove: Product) => {
  const existingItem = cart.find((item) => item.id === productToRemove.id);

  if (existingItem && existingItem.quantity && existingItem.quantity > 1) {
    return cart.map((item) =>
      item.id === productToRemove.id
        ? { ...item, quantity: (item.quantity ?? 0) - 1 }
        : item
    );
  }

  return cart.filter((item) => item.id !== productToRemove.id);
};

const clearItemCart = (cart: CartItem[], productToClear: Product) =>
  cart.filter((item) => item.id !== productToClear.id);

export const setItemToCart = withMatcher(
  (newCart: CartItem[]): SetItemToCartType =>
    createAction(CART_ACTION_TYPES.CART_SET_ITEM, newCart)
);

export const addItemToCart = (
  cart: CartItem[],
  productToAdd: Product
): SetItemToCartType => {
  const newCart = addCartItem(cart, productToAdd);
  return setItemToCart(newCart);
};

export const removeItemFromCart = (
  cart: CartItem[],
  productToRemove: Product
): SetItemToCartType => {
  const newCart = removeCartItem(cart, productToRemove);
  return setItemToCart(newCart);
};

export const clearItemFromCart = (
  cart: CartItem[],
  productToClear: Product
): SetItemToCartType => {
  const newCart = clearItemCart(cart, productToClear);
  return setItemToCart(newCart);
};
