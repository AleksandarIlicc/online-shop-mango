import { FiSearch } from "react-icons/fi";

import "./search-box.styles.scss";

interface SearchBoxProps {
  setShowSearchBox: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  setShowSearchBox,
  handleSearch,
}) => {
  const showSearchHandler = () => {
    setShowSearchBox(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleSearch(event);

  return (
    <form className="search">
      <input
        type="text"
        name="searchText"
        placeholder="search products"
        onChange={handleInputChange}
      />
      <FiSearch className="search__icon" onClick={showSearchHandler} />
    </form>
  );
};

export default SearchBox;
