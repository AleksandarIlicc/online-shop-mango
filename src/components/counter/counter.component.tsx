import ButtonBase from "../button/button-base/button-base.component";

import { FaPlus, FaMinus } from "react-icons/fa";

import "./counter.styles.scss";

interface CounterType {
  children: React.ReactNode;
  className: string;
  removeItemHandler: () => void;
  addItemHandler: () => void;
}

const Counter: React.FC<CounterType> = ({
  children,
  className,
  removeItemHandler,
  addItemHandler,
}): JSX.Element => {
  return (
    <div className="product-counter">
      <ButtonBase className={className} onClick={removeItemHandler}>
        <FaMinus />
      </ButtonBase>
      {children}
      <ButtonBase className={className} onClick={addItemHandler}>
        <FaPlus />
      </ButtonBase>
    </div>
  );
};

export default Counter;
