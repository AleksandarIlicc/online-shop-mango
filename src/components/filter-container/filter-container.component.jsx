import ButtonBase from "../button/button-base/button-base.component";
import "./filter-container.styles.scss";

const categories = ["bags", "hats"];
const brands = ["nike", "adidas"];
const colors = ["white", "black"];
const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $500",
    value: "201-500",
  },
];

const FilterContainer = () => {
  return (
    <div className={"filter-container"}>
      <div>
        <h3>category</h3>
        <ul>
          <li className="btn__category">All</li>
          {categories.map((c, i) => {
            return (
              <li key={i} className="btn__category">
                {c}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>brand</h3>
        <ul>
          <li className="btn__category">All</li>
          {brands.map((b, i) => {
            return (
              <li key={i} className="btn__category">
                {b}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>Color</h3>
        <ul className="color-list">
          <li className="btn__category">All</li>
          {colors.map((c, i) => {
            return (
              <li
                key={i}
                className={`color-list__item color-list__item--${c}`}
              ></li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>Price</h3>
        <ul>
          <li className="btn__category"> All</li>
          {prices.map((p) => (
            <li key={p.value} className="btn__category">
              {p.name}
            </li>
          ))}
        </ul>
      </div>
      <ButtonBase type="button" className="btn btn__apply-filters">
        Apply Filters
      </ButtonBase>
    </div>
  );
};

export default FilterContainer;
