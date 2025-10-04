export function normalizeJobData(jobsData) {
  return jobsData.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    experienceLevel: job.experienceLevel,
    minSalary: job.salaryRange?.min || 0,
    maxSalary: job.salaryRange?.max || 0,
    requiredTech: job.requiredTech || [],
    description: job.description || "No detailed description provided.",
    postedDate: new Date(job.datePosted),
    isSaved: false,
    isRemote: job.location === "Remote" ? true : false,
  }));
}
