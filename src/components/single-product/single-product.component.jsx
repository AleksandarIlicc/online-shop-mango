import { Link } from "react-router-dom";

import Rating from "../rating/rating.component";

import "./single-product.styles.scss";

const SingleProduct = ({ productArray }) => {
  console.log(productArray);

  return (
    <article className={"product product--cols"}>
      {/* <Link to={`/api/products/${product.id}`}>
        <figure className="product__img">
          <img src={product.image} alt={product.name} />
        </figure>
      </Link>
      <div className={"product__info product__info--cols"}>
        <h3 className="heading__tertiary">{product.name}</h3>
        <p className="paragraph">{product.info}</p>
        <div>
          <Rating rating={product.rating} />
          <span className="product__price">${product.price.toFixed(2)}</span>
        </div>
      </div> */}
    </article>
  );
};

export default SingleProduct;
