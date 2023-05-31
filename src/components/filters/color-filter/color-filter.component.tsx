interface ColorFilterProps {
  colors: string[];
  filterProducts: (query: string) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({
  colors,
  filterProducts,
}) => {
  return (
    <div>
      <h3>Color</h3>
      <ul className="color-list">
        {colors.map((color, i) => (
          <li
            key={i}
            className={`color-list__item color-list__item--${color}`}
            onClick={() => filterProducts(color)}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default ColorFilter;
