import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { FaTimes } from "react-icons/fa";

import CategoryFilter from "../category-filter/category-filter.component";
import BrandFilter from "../brand-filter/brand-filter.component";
import ColorFilter from "../color-filter/color-filter.component";
import PriceFilter from "../price-filter/price-filter.component";
import ButtonBase from "../../button/button-base/button-base.component";
import { getProductsAndDocument } from "src/utils/firebase.utils";
import {
  fetchProductsAsync,
  searchProducts,
  filterProductsByPrice,
  ProductsAction,
} from "src/store/products/products.action";
import { RootState } from "src/store/store";

import "./filter-container.styles.scss";

interface FilterContainerProps {
  showFilterContainer: boolean;
  closeFilterContainer: () => void;
}

const FilterContainer: React.FC<FilterContainerProps> = ({
  showFilterContainer,
  closeFilterContainer,
}) => {
  const dispatch: ThunkDispatch<RootState, undefined, ProductsAction> =
    useDispatch();

  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await getProductsAndDocument("products");

      setCategories([...new Set(products.map(({ category }) => category))]);
      setBrands([...new Set(products.map(({ brand }) => brand))]);
      setColors([...new Set(products.map(({ color }) => color))]);
    };

    getProducts();
  }, []);

  const getAllProducts = () => dispatch(fetchProductsAsync());
  const filterProducts = (query: string) => dispatch(searchProducts(query));
  const filterByPrice = (price: string) =>
    dispatch(filterProductsByPrice(price));
  return (
    <div
      className={`filter-container ${
        showFilterContainer ? "filter-container--show" : ""
      }`}
    >
      <h3 className="show-all-products" onClick={getAllProducts}>
        Show all products
      </h3>

      {/* ALL FILTERS */}
      <CategoryFilter categories={categories} filterProducts={filterProducts} />
      <BrandFilter brands={brands} filterProducts={filterProducts} />
      <ColorFilter colors={colors} filterProducts={filterProducts} />
      <PriceFilter filterByPrice={filterByPrice} />

      <ButtonBase type="button" className="btn btn__apply-filters">
        Apply Filters
      </ButtonBase>

      <FaTimes
        style={{ color: "white" }}
        className="icon__times icon__times--filters"
        onClick={closeFilterContainer}
      />
    </div>
  );
};

export default FilterContainer;
