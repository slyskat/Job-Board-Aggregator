import { Loader2 } from "lucide-react";
import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <Loader2 className={styles.spinner} />
      <p className={styles.text}>Loading jobs...</p>
    </div>
  );
}

export default LoadingSpinner;
