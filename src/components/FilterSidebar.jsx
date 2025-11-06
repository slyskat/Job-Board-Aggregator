import { Clock, MapPin, X } from "lucide-react";
import Button from "./ui/Button";

import styles from "./FilterSidebar.module.css";
import Toggle from "./ui/Toggle";
import Checkbox from "./ui/Checkbox";

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
                <label className={styles.toggleLabel}>
                  Remote Positions only
                </label>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Clock className={styles.sectionIcon} />
                <label className={styles.sectionLabel}>Job Type</label>
              </div>
              <div className={styles.checkboxContainer}>
                {jobTypes.map((type) => (
                  <div key={type.id} className={styles.checkboxItem}>
                    <Checkbox />
                    <label className={styles.checkboxLabel}>{type.label}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterSidebar;
