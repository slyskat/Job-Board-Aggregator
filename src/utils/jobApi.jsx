import jobsData from "../data/jobs.json";

const simulateNetworkDelay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchJobs = async () => {
  await simulateNetworkDelay(300);
  return jobsData;
};
