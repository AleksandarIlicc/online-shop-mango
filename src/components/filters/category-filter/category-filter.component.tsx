import ButtonBase from "src/components/button/button-base/button-base.component";

interface CategoryFilterProps {
  categories: string[];
  filterProducts: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  filterProducts,
}) => {
  return (
    <div>
      <h3>Category</h3>
      <ul className="filter-list">
        {categories.map((category, i) => (
          <li key={i} onClick={() => filterProducts(category)}>
            <ButtonBase className="btn__category">{category}</ButtonBase>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
