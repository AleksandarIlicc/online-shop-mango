import { createAction } from "../../utils/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cart, productToAdd) => {
  const existingItem = cart.find((item) => item.id === productToAdd.id);

  if (existingItem) {
    return cart.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cart, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cart, productToRemove) => {
  const existingItem = cart.find((item) => item.id === productToRemove.id);

  if (existingItem && existingItem.quantity > 1) {
    return cart.map((item) =>
      item.id === productToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }

  return cart.filter((item) => item.id !== productToRemove.id);
};

const clearItemCart = (cart, productToClear) =>
  cart.filter((item) => item.id !== productToClear.id);

const setItemToCart = (newCart) =>
  createAction(CART_ACTION_TYPES.CART_SET_ITEM, newCart);

export const addItemToCart = (cart, productToAdd) => {
  const newCart = addCartItem(cart, productToAdd);
  return setItemToCart(newCart);
};

export const removeItemFromCart = (cart, productToRemove) => {
  const newCart = removeCartItem(cart, productToRemove);
  return setItemToCart(newCart);
};

export const clearItemFromCart = (cart, productToClear) => {
  const newCart = clearItemCart(cart, productToClear);
  return setItemToCart(newCart);
};
