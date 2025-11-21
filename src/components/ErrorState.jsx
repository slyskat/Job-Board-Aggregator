import { AlertCircle } from "lucide-react";
import styles from "./ErrorState.module.css";
import Button from "./ui/Button";

function ErrorState({ onRetry }) {
  return (
    <div className={styles.container}>
      <AlertCircle className={styles.icon} />
      <h3 className={styles.title}>Failed to load jobs</h3>
      <p className={styles.text}>
        We encountered an error while fetching job listings. Please check your
        connection and try again.
      </p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
}

export default ErrorState;
