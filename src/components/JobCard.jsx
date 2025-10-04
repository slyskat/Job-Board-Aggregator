import { formatPostedDate } from "../utils/dateFormatter";
import { limitTechStack } from "../utils/stackFormatter";
import { formatSalary } from "../utils/salaryFormatter";
import { BookmarkIcon, Clock, DollarSign, MapPin } from "lucide-react";
import Button from "./ui/Button";
import styles from "./JobCard.module.css";

function JobCard({ job, onSaveJob }) {
  // console.log(job);
  // console.log(job?.id);

  const {
    title,
    company,
    location,
    minSalary,
    maxSalary,
    postedDate,
    experienceLevel,
    requiredTech,
    description,
  } = job;

  // const onAddSaveJob = (isSaved, job) => {
  //   if (isSaved) {
  //     setSavedJobs([...savedJobs, job]);
  //   }
  // };

  // const onSaveJob = (isSaved) => {};

  // console.log(requiredTech);

  const salary = formatSalary(minSalary, maxSalary);
  const date = formatPostedDate(postedDate);
  const limit = 5;
  const techStack = limitTechStack(requiredTech, limit);

  return (
    <div className={styles.jobCard}>
      <div className={styles.cardHeader}>
        <div className={styles.companyInfo}>
          <div className={styles.jobInfo}>
            <h3 className={styles.jobTitle}>{title}</h3>
            <p className={styles.companyName}>{company}</p>
          </div>
        </div>

        <Button
          onClick={() => onSaveJob(job.id)}
          className={`${styles.saveButton} ${job.isSaved ? styles.saved : ""}`}
        >
          <BookmarkIcon className={styles.bookmarkIcon} />
        </Button>
      </div>

      <div className={styles.jobInfo}>
        <div className={styles.infoItem}>
          <MapPin className={styles.infoIcon} />
          <span>{location}</span>
        </div>

        <div className={styles.infoItem}>
          <Clock className={styles.infoIcon} />
          <span>{date}</span>
        </div>

        <div className={styles.infoItem}>
          <DollarSign className={styles.infoIcon} />
          <span className={styles.salary}>{salary}</span>
        </div>
      </div>

      <div className={styles.jobTags}>
        <span className={styles.experienceTag}>{experienceLevel}</span>
      </div>

      <div className={styles.skillsContainer}>
        {techStack.displayItems.length > 0
          ? techStack.displayItems.map((skill) => (
              <span key={skill} className={styles.skillTag}>
                {skill}
              </span>
            ))
          : null}
        {techStack.displayItems.length > 4 ? (
          <span className={styles.moreSkills}>
            + {techStack.remainingCount} more
          </span>
        ) : null}
      </div>

      <p className={styles.jobDescription}>
        {description ? description : "No description provided"}
      </p>
    </div>
  );
}

export default JobCard;
