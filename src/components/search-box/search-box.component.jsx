import { FiSearch } from "react-icons/fi";

import "./search-box.styles.scss";

const SearchBox = ({setShowSearch}) => {
  return (
    <form className="search">
      <input type="text" placeholder="search products" />
      <FiSearch className="search__icon" onClick={() => setShowSearch(true)}/>
    </form>
  );
};

export default SearchBox;
