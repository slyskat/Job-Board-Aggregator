import { BookmarkIcon, Search, MenuIcon } from "lucide-react";
import Button from "./ui/Button";
import styles from "./Header.module.css";

function Header({ savedCount }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftHeader}>
          <Button className={styles.menuButton}>
            <MenuIcon className={styles.menuIcon} />
          </Button>

          <div className={styles.logo}>
            <Search className={styles.logoIcon} />
            <span className={styles.logoText}>JobBoard</span>
          </div>
        </div>

        <div className={styles.rightHeader}>
          <Button className={styles.savedButton}>
            <BookmarkIcon className={styles.icon} />
            {savedCount > 0 && (
              <span className={styles.savedCount}>{savedCount}</span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
