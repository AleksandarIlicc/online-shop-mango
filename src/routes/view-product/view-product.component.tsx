import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import Loader from "../../components/loader/loader.component";
import ViewSingleProduct from "../../components/view-single-product/view-single-product.component";

import { TbArrowBack } from "react-icons/tb";

import { getSingleProduct } from "../../utils/firebase.utils";

import {
  fetchSingleProductError,
  fetchSingleProductStart,
  fetchSingleProductSuccess,
  SingleProductActions,
} from "../../store/single-product/single-product.action";
import {
  selectSingleProduct,
  selectSingleProductError,
  selectSingleProductIsLoading,
} from "../../store/single-product/single-product.selector";

import { RootState } from "src/store/store";

import "./view-product.styles.scss";

const ViewProduct = () => {
  const productID = useParams().id;
  const dispatch: ThunkDispatch<RootState, undefined, SingleProductActions> =
    useDispatch();

  const product = useSelector(selectSingleProduct);
  const isLoading = useSelector(selectSingleProductIsLoading);
  const error = useSelector(selectSingleProductError);

  useEffect(() => {
    const fetchData = async () => {
      if (productID) {
        dispatch(fetchSingleProductStart());
        try {
          const productData = await getSingleProduct("products", productID);
          productData && dispatch(fetchSingleProductSuccess(productData));
        } catch (error) {
          dispatch(fetchSingleProductError(error));
        }
      }
    };
    fetchData();
  }, [dispatch, productID]);

  return (
    <main>
      <section className="single-product-container">
        <button className="btn__back-arrow">
          <Link to="/products">
            <TbArrowBack />
          </Link>
        </button>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p>Product does not exist with id: {productID}</p>
        ) : (
          product && <ViewSingleProduct key={product.id} product={product} />
        )}
      </section>
    </main>
  );
};

export default ViewProduct;
