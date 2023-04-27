import { FaShippingFast } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { BiCube } from "react-icons/bi";

import "./shopping-info-bar.styles.scss";

const shoppingBatInfo = [
  {
    icon: <FaShippingFast />,
    title: "Free Shipping",
    paragraph: "Free delivery over $250",
  },
  {
    icon: <GiReturnArrow />,
    title: "Free Retruns",
    paragraph: "Paypal free returns",
  },
  {
    icon: <RiSecurePaymentFill />,
    title: "Secure Shopping",
    paragraph: "Best security features",
  },
  {
    icon: <BiCube />,
    title: "Unlimited Blocks",
    paragraph: "Any content, any page",
  },
];

const ShoppingInfoBar = () => {
  return (
    <div className="shopping-info-bar">
      {shoppingBatInfo.map((item, index) => {
        return (
          <div key={index} className="shopping-info-bar__box">
            <div className="shopping-info-bar__icon">{item.icon}</div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.paragraph}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShoppingInfoBar;
