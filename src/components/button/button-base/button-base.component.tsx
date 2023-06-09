import "./button-base.styles.scss";

interface ButtonBaseType {
  children: React.ReactNode;
  className?: string;
  otherProps?: any;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  key?: number;
}

const ButtonBase: React.FC<ButtonBaseType> = ({
  children,
  className,
  ...otherProps
}): JSX.Element => {
  return (
    <button className={className} {...otherProps}>
      {children}
    </button>
  );
};

export default ButtonBase;
