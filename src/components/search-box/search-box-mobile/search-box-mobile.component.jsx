import { FaTimes } from "react-icons/fa";

import "./search-box-mobile.styles.scss";

const SearchBoxMobile = ({
  showSearch,
  setShowSearch,
  productBrands,
  handleSearch,
}) => {
  return (
    <form
      className={
        showSearch
          ? "search-box-mobile search-box-mobile--active"
          : "search-box-mobile"
      }
    >
      <input type="text" placeholder="search" onChange={handleSearch} />
      <FaTimes className="icon__times" onClick={() => setShowSearch(false)} />
      <div className="search-box-mobile__box mt-small">
        <h2>Popular Search Terms</h2>
        <ul>
          {[...productBrands].map((brand) => (
            <li>{brand.charAt(0).toUpperCase() + brand.slice(1)}</li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default SearchBoxMobile;
