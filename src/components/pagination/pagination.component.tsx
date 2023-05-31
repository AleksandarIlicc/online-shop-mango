import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import ButtonBase from "../button/button-base/button-base.component";
import {
  ProductsAction,
  changePaginationPage,
} from "src/store/products/products.action";
import {
  selectPaginationPage,
  selectProducts,
  selectProductsPerPage,
} from "src/store/products/products.selector";
import { RootState } from "src/store/store";
import "./pagination.styles.scss";

const Pagination: React.FC = () => {
  const productsPerPage = useSelector(selectProductsPerPage);
  const paginationPage = useSelector(selectPaginationPage);
  const dispatch: ThunkDispatch<RootState, undefined, ProductsAction> =
    useDispatch();
  const products = useSelector(selectProducts);
  const pageNumber = Math.ceil(products.length / productsPerPage);

  const handlePaginationPage = (pageNumber: number): void => {
    dispatch(changePaginationPage(pageNumber));
  };

  return (
    <div className="pagination">
      {Array.from({ length: pageNumber }).map((_, index) => {
        return (
          <ButtonBase
            key={index + 1}
            className={
              paginationPage === index + 1
                ? "btn btn__pagination btn__pagination--active"
                : "btn btn__pagination"
            }
            onClick={() => handlePaginationPage(index + 1)}
          >
            {index + 1}
          </ButtonBase>
        );
      })}
    </div>
  );
};

export default Pagination;
