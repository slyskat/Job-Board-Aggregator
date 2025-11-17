import styles from "./Button.module.css";

function Button({
  children,
  btnType = "primary",
  size = "default",
  className = "",
  onClick,
  ...props
}) {
  const defaultStyle = styles.button;
  const buttonType = styles[btnType] || styles.primary;
  const buttonSize = styles[size] || styles.default;

  const buttonClassName =
    `${defaultStyle} ${buttonType} ${buttonSize} ${className}`.trim();
  return (
    <button className={buttonClassName} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
