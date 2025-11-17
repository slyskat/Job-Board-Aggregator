import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { normalizeJobData } from "./utils/dataNormalizer";
import JobStats from "./components/JobStats";
import { useEffect, useState } from "react";
import { fetchJobs } from "./utils/jobApi";
import JobList from "./components/JobList";
import { ChevronRight } from "lucide-react";
import FilterSidebar from "./components/FilterSidebar";
import { set } from "date-fns";

function App() {
  const [rawJobsData, setRawJobsData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [locationquery, setLocationQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [selectedJobTypes, setSelectedJobTypes] = useState(new Set());
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState(
    new Set()
  );
  const [salaryRange, setSalaryRange] = useState({ min: 0, max: 300000 });
  const [datePosted, setDatePosted] = useState("");
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  useEffect(function () {
    async function loadJobs() {
      const data = await fetchJobs();
      console.log("Raw API Response: ", data);
      setRawJobsData(data);
    }

    loadJobs();
  }, []);

  const jobs = normalizeJobData(rawJobsData);

  console.log("Normalized Jobs:", jobs);
  console.log("First job sample:", jobs[0]);

  // console.log(jobs);

  // const totalJobs = filteredJobs.length;

  function handleSaveJob(id) {
    setSavedJobIds((currentList) => {
      const newList = new Set(currentList);

      if (newList.has(id)) {
        newList.delete(id);
      } else {
        newList.add(id);
      }

      return newList;
    });
  }

  const filteredJobs = jobs
    .filter((job) => {
      const matchesKeyword =
        !searchQuery ||
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation =
        !locationquery ||
        job.location?.toLowerCase().includes(locationquery.toLowerCase());

      const matchesJobType =
        selectedJobTypes.size === 0 || selectedJobTypes.has(job.jobType);

      const matchesExperienceLevel =
        selectedExperienceLevels.size === 0 ||
        selectedExperienceLevels.has(job.experienceLevel);

      const matchesSalary = (() => {
        if (salaryRange.min === 0 && salaryRange.max === 300000) {
          return true;
        }

        if (!job.minSalary && !job.maxSalary) {
          return false;
        }

        const jobMin = job.minSalary || 0;
        const jobMax = job.maxSalary || job.minSalary || 0;

        return jobMax >= salaryRange.min && jobMin <= salaryRange.max;
      })();

      const matchesRemote = !isRemoteOnly || job.isRemote;

      const matchesDatePosted = (() => {
        if (!datePosted) return true;

        const now = new Date();
        const jobDate = new Date(job.postedDate);
        const differenceInHours = (now - jobDate) / (1000 * 60 * 60);

        switch (datePosted) {
          case "24h":
            return differenceInHours <= 24;
          case "3d":
            return differenceInHours <= 72;

          case "7d":
            return differenceInHours <= 168;
          case "30d":
            return differenceInHours <= 720;
          default:
            return true;
        }
      })();

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesJobType &&
        matchesExperienceLevel &&
        matchesSalary &&
        matchesRemote &&
        matchesDatePosted
      );
    })
    .map((job) => ({
      ...job,
      isSaved: savedJobIds.has(job.id),
    }));

  function handleJobClick(job) {
    setIsJobModalOpen(true);
    setSelectedJob(job);
  }

  function handleCloseJobModal() {
    setIsJobModalOpen(false);
    setSelectedJob(null);
  }

  const savedCount = savedJobIds.size;
  // console.log(typeof filteredJobs);
  return (
    <div className="app">
      <Header savedCount={savedCount} />
      <div className="container">
        <div className="layout">
          <FilterSidebar
            isOpen={isFilterOpen}
            onFilterChange={setIsFilterOpen}
            selectedJobTypes={selectedJobTypes}
            onJobTypeChange={setSelectedJobTypes}
            selectedExperienceLevels={selectedExperienceLevels}
            onExperienceLevelChange={setSelectedExperienceLevels}
            salaryRange={salaryRange}
            onSalaryRangeChange={setSalaryRange}
            datePosted={datePosted}
            onDatePostedChange={setDatePosted}
            isRemoteOnly={isRemoteOnly}
            onRemoteOnlyChange={setIsRemoteOnly}
          />
          <main className="main">
            <SearchBar
              searchQuery={searchQuery}
              setLocationQuery={setLocationQuery}
              setSearchQuery={setSearchQuery}
              locationquery={locationquery}
            />
            <JobStats jobs={filteredJobs} />
            <div className="breadcrumb">
              <span>Jobs</span>
              <ChevronRight className="breadcrumbIcon" />
              <span>Search Results</span>
            </div>

            <JobList
              jobs={filteredJobs}
              onSaveJob={handleSaveJob}
              onJobCick={handleJobClick}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
