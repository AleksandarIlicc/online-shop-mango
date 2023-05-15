import { useEffect } from "react";

import FilterContainer from "../../components/filter-container/filter-container.component";
import ProductsList from "../../components/products-list/products-list.component";

import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../store/products/products.selector";

import { fetchProductsAsync } from "../../store/products/products.action";

import "./products.styles.scss";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <section className="products-container">
      <FilterContainer />
      <ProductsList products={products} />;
    </section>
  );
};

export default Products;
