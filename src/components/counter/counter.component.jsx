import ButtonBase from "../button/button-base/button-base.component";

import { FaPlus, FaMinus } from "react-icons/fa";

import "./counter.styles.scss";

const Counter = ({
  children,
  className,
  removeItemHandler,
  addItemHandler,
}) => {
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
