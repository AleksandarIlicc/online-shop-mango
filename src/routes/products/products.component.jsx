import { useEffect, useState } from "react";

import FilterContainer from "../../components/filter-container/filter-container.component";
import ProductsList from "../../components/products-list/products-list.component";

import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../store/products/products.selector";

import { fetchProductsAsync } from "../../store/products/products.action";

import "./products.styles.scss";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const [showFilterContainer, setShowFilterContainer] = useState(false);

  const openFilterContainer = () => setShowFilterContainer(true);
  const closeFilterContainer = () => setShowFilterContainer(false);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <section className="products-container">
      <FilterContainer
        showFilterContainer={showFilterContainer}
        closeFilterContainer={closeFilterContainer}
      />
      <ProductsList
        products={products}
        openFilterContainer={openFilterContainer}
      />
    </section>
  );
};

export default Products;
