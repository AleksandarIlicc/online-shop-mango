import ButtonBase from "src/components/button/button-base/button-base.component";

interface BrandFilterProps {
  brands: string[];
  filterProducts: (query: string) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({
  brands,
  filterProducts,
}) => {
  return (
    <div>
      <h3>Brand</h3>
      <ul className="filter-list">
        {brands.map((brand, i) => (
          <li key={i} onClick={() => filterProducts(brand)}>
            <ButtonBase className="btn__category">{brand}</ButtonBase>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandFilter;
