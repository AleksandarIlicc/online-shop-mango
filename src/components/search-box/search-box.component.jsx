import { FiSearch } from "react-icons/fi";

import "./search-box.styles.scss";

const SearchBox = () => {
  return (
    <form className="search">
      <input type="text" placeholder="search products" />
      <FiSearch className="search__icon" />
    </form>
  );
};

export default SearchBox;
