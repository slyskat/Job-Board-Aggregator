import { createPortal } from "react-dom";
import JobCard from "./JobCard";
import styles from "./SavedJobsModal.module.css";
import { X } from "lucide-react";

function SavedJobsModal({ isOpen, onClose, savedJobsIds, jobs }) {
  if (!isOpen) return null;

  const savedJobsToDisplay = jobs.filter((job) =>
    savedJobsIds.includes(job.id)
  );

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Saved Jobs ({savedJobsToDisplay.length})
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.scrollArea}>
          {savedJobsToDisplay.length === 0 ? (
            <p className={styles.emptyState}>No saved jobs yet.</p>
          ) : (
            <div className={styles.jobList}>
              {savedJobsToDisplay.map((job) => (
                <JobCard key={job.id} job={job} isSaved={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default SavedJobsModal;
