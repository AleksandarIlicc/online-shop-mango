import "./button-base.styles.scss";

interface ButtonBaseType {
  children: React.ReactNode;
  className?: string;
  otherProps?: any;
}

const ButtonBase: React.FC<ButtonBaseType> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <button className={className} {...otherProps}>
      {children}
    </button>
  );
};

export default ButtonBase;
