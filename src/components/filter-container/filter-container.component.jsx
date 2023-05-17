import ButtonBase from "../button/button-base/button-base.component";

import { FaTimes } from "react-icons/fa";

import "./filter-container.styles.scss";
import { getProductsAndDocument } from "../../utils/firebase.utils";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchProductsAsync,
  searchProducts,
  filterProductsByPrice,
} from "../../store/products/products.action";

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $100",
    value: "51-100",
  },
  {
    name: "$101 to $200",
    value: "101-200",
  },
];

const FilterContainer = ({ showFilterContainer, closeFilterContainer }) => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [brands, setCBrand] = useState([]);
  const [colors, setColors] = useState([]);

  const getProducts = async () => {
    const products = await getProductsAndDocument("products");

    setCategories([...new Set(products.map(({ category }) => category))]);
    setCBrand([...new Set(products.map(({ brand }) => brand))]);
    setColors([...new Set(products.map(({ color }) => color))]);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getAllProducts = () => dispatch(fetchProductsAsync());
  const filterProducts = (query) => dispatch(searchProducts(query));
  const filterByPrice = (price) => dispatch(filterProductsByPrice(price));

  return (
    <div
      className={
        showFilterContainer
          ? "filter-container filter-container--show"
          : "filter-container"
      }
    >
      <div>
        <h3>category</h3>
        <ul onClick={closeFilterContainer}>
          <li className="btn__category" onClick={getAllProducts}>
            All
          </li>
          {categories.map((category, i) => {
            return (
              <li key={i} onClick={() => filterProducts(category)}>
                <ButtonBase className="btn__category">{category}</ButtonBase>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>brand</h3>
        <ul onClick={closeFilterContainer}>
          <li className="btn__category" onClick={getAllProducts}>
            All
          </li>
          {brands.map((brand, i) => {
            return (
              <li key={i} onClick={() => filterProducts(brand)}>
                <ButtonBase className="btn__category">{brand}</ButtonBase>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>color</h3>
        <ul className="color-list" onClick={closeFilterContainer}>
          <li
            style={{ width: "100%" }}
            className="btn__category"
            onClick={getAllProducts}
          >
            All
          </li>
          {colors.map((color, i) => {
            return (
              <li
                key={i}
                className={`color-list__item color-list__item--${color}`}
                onClick={() => filterProducts(color)}
              ></li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>Price</h3>
        <ul onClick={closeFilterContainer}>
          <li className="btn__category" onClick={getAllProducts}>
            {" "}
            All
          </li>
          {prices.map((price) => (
            <li
              key={price.value}
              className="btn__category"
              onClick={() => filterByPrice(price.value)}
            >
              {price.name}
            </li>
          ))}
        </ul>
      </div>
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
