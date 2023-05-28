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

const addCartItem = (cart: CartItem[], productToAdd: Product): CartItem[] => {
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

const removeCartItem = (
  cart: CartItem[],
  productToRemove: CartItem
): CartItem[] => {
  const existingItem = cart.find((item) => item.id === productToRemove.id);

  if (existingItem && existingItem.quantity === 0) {
    return cart.filter((item) => item.id !== productToRemove.id);
  }

  return cart.map((item) =>
    item.id === productToRemove.id
      ? { ...item, quantity: (item.quantity ?? 0) - 1 }
      : item
  );
};

const clearItemCart = (cart: CartItem[], productToClear: Product): CartItem[] =>
  cart.filter((item) => item.id !== productToClear.id);

export const setItemToCart = withMatcher(
  (newCart: CartItem[]): SetItemToCartType =>
    createAction(CART_ACTION_TYPES.CART_SET_ITEM, newCart)
);

export const addItemToCart = (cart: CartItem[], productToAdd: Product) => {
  const newCart = addCartItem(cart, productToAdd);
  return setItemToCart(newCart);
};

export const removeItemFromCart = (
  cart: CartItem[],
  productToRemove: Product
) => {
  const newCart = removeCartItem(cart, productToRemove);
  return setItemToCart(newCart);
};

export const clearItemFromCart = (
  cart: CartItem[],
  productToClear: Product
) => {
  const newCart = clearItemCart(cart, productToClear);
  return setItemToCart(newCart);
};
