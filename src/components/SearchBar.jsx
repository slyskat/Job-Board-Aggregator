import { Filter, MapPin, Search } from "lucide-react";
import Button from "./ui/Button";
import styles from "./SearchBar.module.css";

function SearchBar({
  searchQuery,
  setSearchQuery,
  locationquery,
  setLocationQuery,
}) {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchForm}>
        <div className={styles.searchInputs}>
          <div className={styles.searchInputContainer}>
            <Search className={styles.inputIcon} />
            <input
              placeholder="Job title, keywords, or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.locationInputContainer}>
            <MapPin className={styles.inputIcon} />
            <input
              placeholder="Location"
              value={locationquery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className={styles.locationInput}
            />
          </div>

          <button
            type=""
            onClick={() => {
              setSearchQuery("");
              setLocationQuery("");
            }}
            className={styles.clearButton}
          >
            Clear All
          </button>
          <button className={styles.filtersButton}>
            <Filter className={styles.filtersIcon} />
            <span className={styles.filtersText}>Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
