import { FiSearch } from "react-icons/fi";

import "./search-box.styles.scss";

const SearchBox = ({ setShowSearch, handleSearch }) => {
  return (
    <form className="search">
      <input
        type="text"
        placeholder="search products"
        onChange={handleSearch}
      />
      <FiSearch className="search__icon" onClick={() => setShowSearch(true)} />
    </form>
  );
};

export default SearchBox;
