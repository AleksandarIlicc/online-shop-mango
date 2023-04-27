import { useEffect } from "react";

import FilterContainer from "../../components/filter-container/filter-container.component";
import ProductsList from "../../components/products-list/products-list.component";

import { useDispatch, useSelector } from "react-redux";
import { selectProductsMap } from "../../store/products/products.selector";

import { getProductsAndDocument } from "../../utils/firebase.utils";

import {
  fetchProductsError,
  fetchProductsStart,
  fetchProductsSuccess,
} from "../../store/products/products.action";

import "./products.styles.scss";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProductsMap);
  console.log(products);

  useEffect(() => {
    const fetchCategoriesStartAsync = async () => {
      dispatch(fetchProductsStart());
      try {
        const productsArray = await getProductsAndDocument("products");
        dispatch(fetchProductsSuccess(productsArray));
      } catch (error) {
        dispatch(fetchProductsError(error));
      }
    };
    fetchCategoriesStartAsync();
  }, [dispatch]);

  return (
    <section className="products-container">
      <FilterContainer />
      <ProductsList products={products} />;
    </section>
  );
};

export default Products;
