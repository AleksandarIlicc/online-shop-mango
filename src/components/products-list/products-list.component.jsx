import { useState } from "react";

import SingleProduct from "../single-product/single-product.component";
import SearchBox from "../search-box/search-box.component";
import Loader from "../loader/loader.component";
import ButtonBase from "../button/button-base/button-base.component";

import { FaFilter, FaTimes } from "react-icons/fa";
import { AiFillAppstore, AiOutlineBars } from "react-icons/ai";

import { useSelector } from "react-redux";
import {
  selectProductsError,
  selectProductsLoading,
} from "../../store/products/products.selector";

import "./products-list.styles.scss";

const ProductsList = ({ products }) => {
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const [showSearch, setShowSearch] = useState(false);
  const [productsContainerInCols, setProductsContainerInCols] = useState(true);
  const [productsContainerInRows, setProductsContainerInRows] = useState(false);

  const hadnleProductsContainerInCols = () => {
    setProductsContainerInCols(true);
    setProductsContainerInRows(false);
  };

  const hadnleProductsContainerInRows = () => {
    setProductsContainerInRows(true);
    setProductsContainerInCols(false);
  };

  return (
    <div className="products">
      <div className="products__header">
        <div className="products__header--left">
          <div style={{ display: "flex" }}>
            <label htmlFor="sort">sort by</label>
            <select name="sort" id="sort" className="select-container">
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
              <option value="name-a">a - z</option>
              <option value="name-z">z - a</option>s
            </select>
          </div>
          <div style={{ display: "flex" }}>
            <ButtonBase
              className="btn btn__display"
              onClick={hadnleProductsContainerInCols}
            >
              <AiFillAppstore />
            </ButtonBase>
            <ButtonBase
              className="btn btn__display"
              onClick={hadnleProductsContainerInRows}
            >
              <AiOutlineBars />
            </ButtonBase>
            <ButtonBase className="btn__filter">
              <FaFilter />
            </ButtonBase>
          </div>
        </div>
        <div className="products__header--right">
          <SearchBox setShowSearch={setShowSearch} />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div
            className={
              productsContainerInCols
                ? "products__container products__container--cols"
                : productsContainerInRows
                ? "products__container products__container--rows"
                : "products__container products__container--cols"
            }
          >
            {products.map((product) => {
              return (
                <SingleProduct
                  key={product.id}
                  product={product}
                  productsContainerInCols={productsContainerInCols}
                  productsContainerInRows={productsContainerInRows}
                />
              );
            })}
            {products.length === 0 && <p>No Results</p>}
          </div>
        </>
      )}

      {/* CREATE SEPARATE COMPONENT */}
      <form
        className={
          showSearch
            ? "search-container search-container--active"
            : "search-container"
        }
      >
        <input type="text" placeholder="search" />
        <FaTimes className="icon__times" onClick={() => setShowSearch(false)} />
        <div className="search-container__box mt-small">
          <h2>Popular Search Terms</h2>
          <ul>
            <li>Shoes</li>
            <li>T-shirt</li>
            <li>Nike Cap</li>
            <li>Adidas Jacket</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default ProductsList;
