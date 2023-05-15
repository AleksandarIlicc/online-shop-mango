import { Link } from "react-router-dom";

import Rating from "../rating/rating.component";

import "./single-product.styles.scss";

const SingleProduct = ({
  product,
  productsContainerInCols,
  productsContainerInRows,
}) => {
  return (
    <article
      className={
        productsContainerInCols
          ? "product product--cols"
          : productsContainerInRows
          ? "product product--rows"
          : "product product--cols"
      }
    >
      <Link to={`/product/${product.id}`}>
        <figure
          className={
            productsContainerInRows
              ? "product__img product__img--rows"
              : "product__img"
          }
        >
          <img src={product.image} alt={product.name} />
        </figure>
      </Link>
      <div
        className={
          productsContainerInCols
            ? "product__info product__info--cols"
            : productsContainerInRows
            ? "product__info product__info--rows"
            : "product__info product__info--cols"
        }
      >
        <h3 className="heading__tertiary">
          {product.name.length > 12
            ? product.name.substr(0, 12) + "..."
            : product.name}
        </h3>
        <div>
          <Rating rating={product.rating} />
          <span className="product__price">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
};

export default SingleProduct;
