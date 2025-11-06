import styles from "./Toggle.module.css";

function Toggle({ className }) {
  return (
    <label className={`${styles.toggle} ${className}`}>
      <input type="checkbox" />
      <span className={styles.slider}></span>
    </label>
  );
}

export default Toggle;
