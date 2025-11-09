import { Building2, Clock, DollarSign, MapPin, X } from "lucide-react";
import Button from "./ui/Button";

import styles from "./FilterSidebar.module.css";
import Toggle from "./ui/Toggle";
import Checkbox from "./ui/Checkbox";
import Slider from "./ui/Slider";

function FilterSidebar({
  isOpen,
  selectedJobTypes,
  onJobTypeChange,
  selectedExperienceLevels,
  onExperienceLevelChange,
  salaryRange,
  onSalaryRangeChange,
}) {
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

  function handleJobTypeChangeToggle(typeId) {
    onJobTypeChange((current) => {
      const updated = new Set(current);
      if (updated.has(typeId)) {
        updated.delete(typeId);
      } else {
        updated.add(typeId);
      }
      return updated;
    });
  }

  function handleExperienceLevelToggle(levelId) {
    onExperienceLevelChange((current) => {
      const updated = new Set(current);
      if (updated.has(levelId)) {
        updated.delete(levelId);
      } else {
        updated.add(levelId);
      }
      return updated;
    });
  }

  function handleSalaryChange(value) {
    onSalaryRangeChange({ min: value[0], max: value[1] });
  }

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
                    <Checkbox
                      checked={selectedJobTypes.has(type.id)}
                      onChange={() => handleJobTypeChangeToggle(type.id)}
                    />
                    <label className={styles.checkboxLabel}>{type.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Building2 className={styles.sectionIcon} />
                <label className={styles.sectionLabel}> Experience Level</label>
              </div>
              <div className={styles.checkboxContainer}>
                {experienceLevels.map((level) => (
                  <div key={level.id} className={styles.checkboxItem}>
                    <Checkbox
                      checked={selectedExperienceLevels.has(level.id)}
                      onChange={() => handleExperienceLevelToggle(level.id)}
                    />
                    <label className={styles.checkboxLabel}>
                      {level.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <DollarSign className={styles.sectionIcon} />
                <label className={styles.sectionLabel}>Salary Range</label>
              </div>
              <div className={styles.sliderWrapper}>
                <Slider
                  value={[salaryRange.min, salaryRange.max]}
                  onChange={handleSalaryChange}
                  max={300000}
                  min={0}
                  step={5000}
                />
                <div className={styles.salaryValues}>
                  <span>${salaryRange.min.toLocaleString()}</span>
                  <span>${salaryRange.max.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterSidebar;
