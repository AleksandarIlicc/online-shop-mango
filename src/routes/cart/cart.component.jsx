import SingleCartProduct from "../../components/single-cart-product/single-cart-product.component";
import OrderSummary from "../../components/order-summary/order-summary.component";

import { useSelector } from "react-redux";

import {
  selectCart,
  selectCartCount,
  selectShippingPrice,
  selectTotalPrice,
} from "../../store/cart/cart.selector";

import "./cart.styles.scss";

const Cart = () => {
  const cart = useSelector(selectCart);
  const cartCount = useSelector(selectCartCount);
  const totalPrice = useSelector(selectTotalPrice);
  const shippingPrice = useSelector(selectShippingPrice);

  return (
    <main>
      <section className="cart-section section">
        <h2 className="heading__secondary mb-medium">shopping cart</h2>
        <div className="cart__container">
          <div className="cart__list">
            {cart.length > 0 &&
              cart.map((product) => {
                return <SingleCartProduct key={product.id} product={product} />;
              })}
            {!cart.length && <div>There are no items in your bag.</div>}
          </div>
          <OrderSummary
            cartCount={cartCount}
            totalPrice={totalPrice}
            shippingPrice={shippingPrice}
            cart={cart}
          />
        </div>
      </section>
    </main>
  );
};

export default Cart;
