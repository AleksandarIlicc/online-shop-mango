import { useState } from "react";

import SingleProduct from "../single-product/single-product.component";
import SearchBox from "../search-box/search-box/search-box.component";
import Loader from "../loader/loader.component";
import ButtonBase from "../button/button-base/button-base.component";

import { FaFilter } from "react-icons/fa";
import { AiFillAppstore, AiOutlineBars } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import {
  selectProductsError,
  selectProductsLoading,
} from "../../store/products/products.selector";

import SearchBoxMobile from "../search-box/search-box-mobile/search-box-mobile.component";
import {
  searchProducts,
  sortProducts,
} from "../../store/products/products.action";

import "./products-list.styles.scss";

const ProductsList = ({ products, openFilterContainer }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const [showSearch, setShowSearch] = useState(false);
  const [productsContainerInCols, setProductsContainerInCols] = useState(true);
  const [productsContainerInRows, setProductsContainerInRows] = useState(false);

  const productBrands = new Set(products.map((product) => product.brand));

  const hadnleProductsContainerInCols = () => {
    setProductsContainerInCols(true);
    setProductsContainerInRows(false);
  };

  const hadnleProductsContainerInRows = () => {
    setProductsContainerInRows(true);
    setProductsContainerInCols(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    dispatch(searchProducts(query));
  };

  const sortProductsBySelectOptions = (e) =>
    dispatch(sortProducts(e.target.value));

  return (
    <div className="products">
      <div className="products__header">
        <div className="products__header--left">
          {/* SORT PRODUCTS BY OPTIONS */}
          <div style={{ display: "flex" }}>
            <label htmlFor="sort">sort by</label>
            <select
              name="sort"
              id="sort"
              className="select-container"
              onChange={sortProductsBySelectOptions}
            >
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
              <option value="name-a">a - z</option>
              <option value="name-z">z - a</option>
            </select>
          </div>
          <div style={{ display: "flex" }}>
            {/* SHOW PRODUCTS IN COLS */}
            <ButtonBase
              className="btn btn__display"
              onClick={hadnleProductsContainerInCols}
            >
              <AiFillAppstore />
            </ButtonBase>
            {/* SHOW PRODUCTS IN ROWS */}
            <ButtonBase
              className="btn btn__display"
              onClick={hadnleProductsContainerInRows}
            >
              <AiOutlineBars />
            </ButtonBase>
            {/* SHOW FILTER BUTTON */}
            <ButtonBase className="btn__filter" onClick={openFilterContainer}>
              <FaFilter />
            </ButtonBase>
          </div>
        </div>
        {/* SEARCH FOR PRODUCTS  */}
        <SearchBox setShowSearch={setShowSearch} handleSearch={handleSearch} />
      </div>

      {/* RENDERING PRODUCTS OR ERROR MESSAGE */}
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
                  products={products}
                  productsContainerInCols={productsContainerInCols}
                  productsContainerInRows={productsContainerInRows}
                />
              );
            })}
            {products.length === 0 && <p>No Results</p>}
          </div>
        </>
      )}

      {/* MOBILE SEARCH BOX */}
      <SearchBoxMobile
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        productBrands={productBrands}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default ProductsList;
