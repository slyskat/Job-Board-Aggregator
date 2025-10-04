import JobCard from "./JobCard";
import styles from "./JobList.module.css";

function JobList({ jobs, onSaveJob }) {
  // console.log(jobs);

  // console.log(formatPostedDate(postedDate));
  // limitTechStack();

  // console.log(limitTechStack(tech, 5));

  return (
    <div>
      <div className={styles.jobList}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onSaveJob={onSaveJob} />
        ))}
      </div>
    </div>
  );
}

export default JobList;
