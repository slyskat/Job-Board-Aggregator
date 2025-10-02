import { BookmarkIcon, Search } from "lucide-react";
import Button from "./ui/Button";
import styles from "./Header.module.css";

function Header() {
  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Search />
          <h1>Job Board</h1>
        </div>

        <div>
          <Button>
            <BookmarkIcon></BookmarkIcon>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
