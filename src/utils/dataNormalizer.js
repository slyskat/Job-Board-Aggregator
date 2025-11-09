import inferExperienceLevel from "./inferExperienceLevel";
import normalizeJobType from "./jobtypeNormalizer";

export function normalizeJobData(jobsData) {
  return jobsData.map((job) => ({
    id: job.job_id,
    title: job.job_title,
    company: job.employer_name,
    location:
      job.job_city && job.job_state
        ? `${job.job_city}, ${job.job_state}`
        : job.job_country || "Location not specified",
    jobType: normalizeJobType(job.job_employment_type),
    experienceLevel: inferExperienceLevel(job.job_title),
    minSalary: job.job_min_salary || 0,
    maxSalary: job.job_max_salary || 0,
    requiredTech: job.job_required_skills || [],
    description: job.job_description || "No detailed description provided.",
    postedDate: new Date(job.job_posted_at_datetime_utc || Date.now()),
    isSaved: false,
    isRemote: job.job_is_remote || false,
    applyLink: job.job_apply_link,
    companyLogo: job.employer_logo,
  }));
}
