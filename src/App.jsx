// import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { normalizeJobData } from "./utils/dataNormalizer";
// import { fetchJobs } from "./utils/jobApi";
// import rawJobsData from "./data/jobs.json";
import JobStats from "./components/JobStats";
import { useEffect, useState } from "react";
import { fetchJobs } from "./utils/jobApi";
import JobList from "./components/JobList";

function App() {
  const [rawJobsData, setRawJobsData] = useState([]);
  // const [filters, setFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationquery, setLocationQuery] = useState("");
  // const [error, setError] = useState(null);

  useEffect(function () {
    async function loadJobs() {
      const data = await fetchJobs();
      setRawJobsData(data);
    }

    loadJobs();
  }, []);

  const jobs = normalizeJobData(rawJobsData);

  // console.log(jobs);

  // const totalJobs = filteredJobs.length;

  const filteredJobs = jobs.filter((job) => {
    const matchesKeyword =
      !searchQuery ||
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      !locationquery ||
      job.location?.toLowerCase().includes(locationquery.toLowerCase());

    return matchesKeyword && matchesLocation;
  });

  // console.log(typeof filteredJobs);
  return (
    <div>
      <Header />
      <SearchBar
        searchQuery={searchQuery}
        setLocationQuery={setLocationQuery}
        setSearchQuery={setSearchQuery}
        locationquery={locationquery}
      />
      <JobStats jobs={filteredJobs} />
      <JobList jobs={filteredJobs} />
    </div>
  );
}

export default App;
