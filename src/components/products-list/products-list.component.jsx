import SingleProduct from "../single-product/single-product.component";
import SearchBox from "../search-box/search-box.component";
import Loader from "../loader/loader.component";

import { FaFilter } from "react-icons/fa";
import { AiFillAppstore, AiOutlineBars } from "react-icons/ai";

import { useSelector } from "react-redux";
import {
  selectProductsError,
  selectProductsLoading,
} from "../../store/products/products.selector";

import "./products-list.styles.scss";
import ButtonBase from "../button/button-base/button-base.component";

const ProductsList = ({ products }) => {
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  return (
    <div className="products">
      <div className="products__header">
        <div className="products__header--left">
          <div>
            <label htmlFor="sort">sort by</label>
            <select name="sort" id="sort" className="select-container">
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
              <option value="name-a">a - z</option>
              <option value="name-z">z - a</option>s
            </select>
          </div>
          <div className="btn-container">
            <ButtonBase className="btn btn__display">
              <AiFillAppstore />
            </ButtonBase>
            <button className="btn btn__display">
              <AiOutlineBars />
            </button>
          </div>
          <div>
            <button>
              <FaFilter />
            </button>
          </div>
        </div>
        <div className="products__header--right">
          <SearchBox />
          <span className="view-all">view all</span>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className={"products__container products__container--cols"}>
            {products.map((product) => {
              return <SingleProduct key={product.id} product={product} />;
            })}
            {products.length === 0 && <p>No Results</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsList;
