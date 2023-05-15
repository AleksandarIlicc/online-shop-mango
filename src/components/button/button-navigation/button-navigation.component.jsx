import { FaBars } from "react-icons/fa";

import "./button-navigation.styles.scss";

const ButtonNavigation = ({ showNav, setShowNav, stickyNav }) => {
  return (
    <button
      className={stickyNav ? "btn__bars btn__bars--sticky" : "btn__bars"}
      onClick={() => setShowNav(!showNav)}
    >
      <FaBars />
    </button>
  );
};

export default ButtonNavigation;
