import "./button-base.styles.scss";

const ButtonBase = ({ children, className, ...otherProps }) => {
  return (
    <button className={className} {...otherProps}>
      {children}
    </button>
  );
};

export default ButtonBase;
