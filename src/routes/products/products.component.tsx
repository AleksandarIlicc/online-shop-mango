import { useEffect, useState } from "react";

import FilterContainer from "src/components/filters/filter-container/filter-container.component";
import ProductsList from "../../components/products-list/products-list.component";

import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { selectProducts } from "../../store/products/products.selector";

import {
  ProductsAction,
  fetchProductsAsync,
} from "../../store/products/products.action";

import { Product } from "src/store/products/products.types";

import { RootState } from "src/store/store";

import "./products.styles.scss";

const Products = () => {
  const dispatch: ThunkDispatch<RootState, undefined, ProductsAction> =
    useDispatch();
  const products: Product[] = useSelector(selectProducts);

  const [showFilterContainer, setShowFilterContainer] =
    useState<boolean>(false);

  const openFilterContainer = (): void => setShowFilterContainer(true);
  const closeFilterContainer = (): void => setShowFilterContainer(false);

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
