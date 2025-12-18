import { createPortal } from "react-dom";
import styles from "./JobDetailsModal.module.css";
import Button from "./ui/Button";
import { Building, Clock, MapPin, X } from "lucide-react";
import { useEffect } from "react";
function JobDetailsModal({ isOpen, onClose, job }) {
  console.log(job);

  useEffect(
    function () {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }

      return () => {
        document.body.style.overflow = "unset";
      };
    },
    [isOpen]
  );

  if (!isOpen) return null;
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Button className={styles.closeBtn} onClick={onClose}>
          <X size={24} />
        </Button>

        <div className={styles.header}>
          <img
            src={job.companyLogo || "https://via.placeholder.com/50"}
            alt={job.company}
            className={styles.logo}
          />
          <div>
            <h2>{job.title}</h2>
            <p className={styles.companyName}>
              <Building size={16} /> {job.company}
            </p>
          </div>
        </div>

        <div className={styles.detailsGrid}>
          <span className={styles.tag}>
            <MapPin size={14} /> {job.location}
          </span>
          <span className={styles.tag}>
            <Clock size={14} /> {job.jobType}
          </span>
          {!job.minSalary || !job.maxSalary ? null : (
            <span className={styles.tag}>
              ${job.minSalary} - ${job.maxSalary}
            </span>
          )}
        </div>

        <div className={styles.description}>
          <h3>About the Role</h3>
          <p>{job.description}</p>
        </div>

        <div className={styles.footer}>
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.applyBtn}
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default JobDetailsModal;
