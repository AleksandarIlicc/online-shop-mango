import { FaTimes } from "react-icons/fa";
import React, { ChangeEvent } from "react";
import "./search-box-mobile.styles.scss";

interface SearchBoxMobileProps {
  showSearchBox: boolean;
  setShowSearchBox: React.Dispatch<React.SetStateAction<boolean>>;
  productBrands: string[];
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBoxMobile: React.FC<SearchBoxMobileProps> = ({
  showSearchBox,
  setShowSearchBox,
  productBrands,
  handleSearch,
}) => {
  const showSearchHandler = () => setShowSearchBox(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    handleSearch(event);

  return (
    <form
      className={
        showSearchBox
          ? "search-box-mobile search-box-mobile--active"
          : "search-box-mobile"
      }
    >
      <input type="text" placeholder="search" onChange={handleInputChange} />
      <FaTimes className="icon__times" onClick={showSearchHandler} />
      <div className="search-box-mobile__box mt-small">
        <h2>Popular Search Terms</h2>
        <ul>
          {productBrands.map((brand) => (
            <li key={brand}>
              {brand.charAt(0).toUpperCase() + brand.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default SearchBoxMobile;
