import styles from "./Checkbox.module.css";

function Checkbox({ className, ...props }) {
  return (
    <input
      type="checkbox"
      className={`${styles.checkbox} ${className}`}
      {...props}
    />
  );
}

export default Checkbox;
