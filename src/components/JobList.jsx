import { formatPostedDate } from "../utils/dateFormatter";
import { formatSalary } from "../utils/salaryFormatter";
import { limitTechStack } from "../utils/stackFormatter";
import JobCard from "./JobCard";

function JobList({ jobs }) {
  // console.log(jobs);

  // console.log(formatPostedDate(postedDate));
  // limitTechStack();

  // console.log(limitTechStack(tech, 5));

  return (
    <div>
      <div>
        <p>Jobs &gt; Search Results</p>
        <h2>
          {jobs.length} {jobs.length === 1 ? "job" : "jobs"} found
          {/* {console.log(typeof jobs)} */}
        </h2>
      </div>

      <div>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default JobList;
