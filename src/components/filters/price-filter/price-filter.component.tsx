import ButtonBase from "src/components/button/button-base/button-base.component";

interface PriceType {
  name: string;
  value: string;
}

interface PriceFilterProps {
  filterByPrice: (price: string) => void;
}

const prices: PriceType[] = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $100",
    value: "51-100",
  },
  {
    name: "$101 to $200",
    value: "101-200",
  },
];

const PriceFilter: React.FC<PriceFilterProps> = ({ filterByPrice }) => {
  return (
    <div>
      <h3>Price</h3>
      <ul className="filter-list">
        {prices.map((price) => (
          <li key={price.value} onClick={() => filterByPrice(price.value)}>
            <ButtonBase className="btn__category">{price.name}</ButtonBase>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceFilter;
