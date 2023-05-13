import Counter from "../counter/counter.component";
import ButtonBase from "../button/button-base/button-base.component";

import { FaTimes } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";

import "./single-cart-product.scss";

const SingleCartProduct = ({ product }) => {
  const { image, name, selectedSize, color, brand, price, quantity } = product;

  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const addItemHandler = () => {
    dispatch(addItemToCart(cart, product));
  };

  const removeItemHandler = () => {
    dispatch(removeItemFromCart(cart, product));
  };

  const clearItemHandler = () => {
    dispatch(clearItemFromCart(cart, product));
  };

  return (
    <div className="cart__product">
      <figure className="cart-product__img">
        <img src={image} alt={name} />
      </figure>
      <div className="cart--grid">
        <div className="cart-product__info">
          <p>
            Size: {""}
            <span>{selectedSize}</span>
          </p>
          <p>
            Color: {""}
            <span>{color}</span>
          </p>
          <p>
            Brand: {""}
            <span>{brand}</span>
          </p>
        </div>

        <div>
          <p className="cart-product__total-price">
            ${price.toFixed(2) * quantity}
          </p>
          <p className="cart-product__price">${price.toFixed(2)} each</p>
        </div>

        <Counter
          className="btn__counter btn__counter--cart"
          addItemHandler={addItemHandler}
          removeItemHandler={removeItemHandler}
        >
          <span style={{ fontSize: "2.5rem" }}>{quantity}</span>
        </Counter>

        <div>
          <ButtonBase className="btn btn__remove" onClick={clearItemHandler}>
            <span>remove</span>
            <FaTimes />
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default SingleCartProduct;
