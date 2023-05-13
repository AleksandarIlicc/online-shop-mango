import { Link } from "react-router-dom";

import Rating from "../rating/rating.component";

import "./single-product.styles.scss";

const SingleProduct = ({ product }) => {
  return (
    <article className={"product product--cols"}>
      <Link to={`/product/${product.id}`}>
        <figure className="product__img">
          <img src={product.image} alt={product.name} />
        </figure>
      </Link>
      <div className={"product__info product__info--cols"}>
        <h3 className="heading__tertiary">
          {product.name.length > 12
            ? product.name.substr(0, 12) + "..."
            : product.name}
        </h3>
        <p className="paragraph">{product.info}</p>
        <div>
          <Rating rating={product.rating} />
          <span className="product__price">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
};

export default SingleProduct;
