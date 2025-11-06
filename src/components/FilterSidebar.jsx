import { MapPin, X } from "lucide-react";
import Button from "./ui/Button";

import styles from "./FilterSidebar.module.css";
import Toggle from "./ui/Toggle";

function FilterSidebar({ isOpen }) {
  const jobTypes = [
    { id: "full-time", label: "Full-time" },
    { id: "part-time", label: "Part-time" },
    { id: "contract", label: "Contract" },
    { id: "internship", label: "Internship" },
  ];

  const experienceLevels = [
    { id: "entry", label: "Entry Level" },
    { id: "mid", label: "Mid Level" },
    { id: "senior", label: "Senior Level" },
    { id: "lead", label: "Lead/Principal" },
  ];

  return (
    <>
      <div className={styles.filterModal}>
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
          <div className={styles.header}>
            <h3 className={styles.title}>Filters</h3>
            <div className={styles.headerButtons}>
              <Button>Clear All</Button>
              <Button>
                <X className={styles.closeIcon} />
              </Button>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <MapPin />
                <label className={styles.sectionLabel}>Remote Work</label>
              </div>

              <div className={styles.toggleWrapper}>
                <Toggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterSidebar;
