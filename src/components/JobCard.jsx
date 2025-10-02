import { formatPostedDate } from "../utils/dateFormatter";
import { limitTechStack } from "../utils/stackFormatter";
import { formatSalary } from "../utils/salaryFormatter";
import { BookmarkIcon, Clock, DollarSign, MapPin } from "lucide-react";

function JobCard({ job }) {
  // console.log(job);
  // console.log(job?.id);

  const {
    id,
    title,
    company,
    location,
    minSalary,
    maxSalary,
    postedDate,
    experienceLevel,
    requiredTech,
    description,
    isSaved,
  } = job;

  // console.log(requiredTech);

  const salary = formatSalary(minSalary, maxSalary);
  const date = formatPostedDate(postedDate);
  const limit = 5;
  const techStack = limitTechStack(requiredTech, limit);
  console.log(techStack);

  // const { displayItems, remainingCount } = techStack;
  // console.log(displayItems);

  return (
    <div>
      <div>
        <div>
          <h3>{title}</h3>
          <p>{company}</p>
        </div>

        <button>
          <BookmarkIcon size={20} />
        </button>
      </div>

      <div>
        <MapPin /> <span>{location}</span>
        <DollarSign /> <span>{salary}</span>
        <Clock /> <span>{date}</span>
      </div>

      <div>{experienceLevel ? experienceLevel : null}</div>

      {techStack.displayItems.length > 0 && (
        <div>
          {techStack.displayItems.map((tech) => (
            <div key={tech}>{tech}</div>
          ))}
        </div>
      )}

      <div>{description ? description : "No description provided"}</div>
    </div>
  );
}

export default JobCard;
