import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { AiFillAppstore, AiOutlineBars } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "src/store/store";
import { Product } from "src/store/products/products.types";
import SingleProduct from "../single-product/single-product.component";
import SearchBox from "../search-box/search-box/search-box.component";
import Loader from "../loader/loader.component";
import ButtonBase from "../button/button-base/button-base.component";
import SearchBoxMobile from "../search-box/search-box-mobile/search-box-mobile.component";
import Pagination from "../pagination/pagination.component";
import {
  ProductsAction,
  searchProducts,
  sortProducts,
} from "../../store/products/products.action";
import {
  selectPaginationPage,
  selectProductsError,
  selectProductsLoading,
  selectProductsPerPage,
} from "../../store/products/products.selector";

import "./products-list.styles.scss";

interface ProductsListProps {
  products: Product[];
  openFilterContainer: () => void;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  openFilterContainer,
}) => {
  const dispatch: ThunkDispatch<RootState, undefined, ProductsAction> =
    useDispatch();

  const productsPerPage = useSelector(selectProductsPerPage);
  const paginationPage = useSelector(selectPaginationPage);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const errorMessage: React.ReactNode | null =
    error instanceof Error ? error.message : error;

  const [showSearchBox, setShowSearchBox] = useState(false);
  const [productsContainerInCols, setProductsContainerInCols] = useState(true);
  const [productsContainerInRows, setProductsContainerInRows] = useState(false);

  const productBrands = [...new Set(products.map((product) => product.brand))];

  const indexOfLastProduct = productsPerPage * paginationPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const hadnleProductsContainerInCols = () => {
    setProductsContainerInCols(true);
    setProductsContainerInRows(false);
  };

  const hadnleProductsContainerInRows = () => {
    setProductsContainerInRows(true);
    setProductsContainerInCols(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    dispatch(searchProducts(query));
  };

  const sortProductsBySelectOptions = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    dispatch(sortProducts(value));
  };

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
        <SearchBox
          setShowSearchBox={setShowSearchBox}
          handleSearch={handleSearch}
        />
      </div>

      {/* RENDERING PRODUCTS OR ERROR MESSAGE */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="error-message">{errorMessage}</div>
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
            {currentProducts.map((product) => {
              return (
                <SingleProduct
                  key={product.id}
                  product={product}
                  currentProducts={currentProducts}
                  productsContainerInCols={productsContainerInCols}
                  productsContainerInRows={productsContainerInRows}
                />
              );
            })}
          </div>
        </>
      )}

      {/* PAGINATION */}
      <Pagination />

      {/* MOBILE SEARCH BOX */}
      <SearchBoxMobile
        showSearchBox={showSearchBox}
        setShowSearchBox={setShowSearchBox}
        productBrands={productBrands}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default ProductsList;
