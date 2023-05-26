import { FaBars } from "react-icons/fa";

import "./button-navigation.styles.scss";

interface ButtonNavigationType {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  stickyNav: boolean;
}

const ButtonNavigation: React.FC<ButtonNavigationType> = ({
  showNav,
  setShowNav,
  stickyNav,
}): JSX.Element => {
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
