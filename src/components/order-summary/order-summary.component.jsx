import ButtonBase from "../button/button-base/button-base.component";

import "./order-summary.styles.scss";

const OrderSummary = ({ cartCount, shippingPrice, totalPrice, cart }) => {
  return (
    <div className="order-summary">
      <div>
        <p>Number of products:</p>
        <span>{cartCount}</span>
      </div>
      <div>
        <p>Shipping:</p>
        <span className="shipping">${shippingPrice}</span>
      </div>
      <div>
        <p>Total price:</p>
        <span>${totalPrice}</span>
      </div>
      <div>
        <p className="total-price">Price with shipping:</p>
        <span>${totalPrice + shippingPrice}</span>
      </div>
      <ButtonBase
        type="button"
        className="btn btn__proceed mt-large"
        disabled={cart.length === 0}
      >
        Proceed to Checkout
      </ButtonBase>
    </div>
  );
};

export default OrderSummary;
