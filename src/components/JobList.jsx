import JobCard from "./JobCard";
import styles from "./JobList.module.css";

function JobList({ jobs, onSaveJob, onJobClick }) {
  return (
    <div>
      <div className={styles.jobList}>
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onSaveJob={onSaveJob}
            onClick={() => onJobClick(job)}
          />
        ))}
      </div>
    </div>
  );
}

export default JobList;
