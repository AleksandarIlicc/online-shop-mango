import React, { useState } from "react";

import Rating from "../rating/rating.component";
import Counter from "../counter/counter.component";
import ButtonBase from "../button/button-base/button-base.component";

import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import {
  SetItemToCartType,
  addItemToCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import { selectCart } from "../../store/cart/cart.selector";

import { Product } from "src/store/products/products.types";
import { CartItem } from "src/store/cart/cart.types";

import { RootState } from "src/store/store";

import "./view-single-product.styles.scss";

interface ViewSingleProductType {
  product: Product;
}

const ViewSingleProduct: React.FC<ViewSingleProductType> = ({
  product,
}): JSX.Element => {
  const { image, name, rating, size, price } = product;

  const dispatch: ThunkDispatch<RootState, undefined, SetItemToCartType> =
    useDispatch();
  const [selectedSize, setSelectedSize] = useState("S");
  const cart = useSelector(selectCart);

  const productInCart = cart.find((item) => item.id === product.id);

  const addItemHandler = () => {
    dispatch(addItemToCart(cart as CartItem[], { ...product, selectedSize }));
  };

  const removeItemHandler = () => {
    dispatch(removeItemFromCart(cart as CartItem[], product));
  };

  return (
    <article className="single-product">
      <figure className="single-product__img">
        <img src={image} alt={name} />
      </figure>
      <div className="single-product__info">
        <h3
          style={{ marginBottom: "1rem" }}
          className="heading__primary heading__primary--black"
        >
          {name}
        </h3>
        <div style={{ marginBottom: "1rem" }}>
          <Rating rating={rating} />
          <span className="single-product__price">${price?.toFixed(2)}</span>
        </div>

        <div className="size-box">
          <label htmlFor="sort">Select size:</label>
          <select
            name="sort"
            id="sort"
            className="select-container"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {size.length &&
              size.map((productSize, index) => {
                return (
                  <option key={index} value={productSize}>
                    {productSize}
                  </option>
                );
              })}
            {!size.length && <option>no sizes</option>}
          </select>
        </div>

        <Counter
          className="btn__counter btn__counter--view-single-product"
          addItemHandler={addItemHandler}
          removeItemHandler={removeItemHandler}
        >
          <span style={{ fontSize: "3rem" }}>
            {(productInCart as CartItem)?.quantity ?? 0}
          </span>
        </Counter>

        <ButtonBase
          type="button"
          className="btn btn__cart mt-medium"
          onClick={addItemHandler}
        >
          add to cart
        </ButtonBase>
      </div>
    </article>
  );
};

export default ViewSingleProduct;
