import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { normalizeJobData } from "./utils/dataNormalizer";
import JobStats from "./components/JobStats";
import { useEffect, useState } from "react";
import { fetchJobs } from "./utils/jobApi";
import JobList from "./components/JobList";
import { ChevronRight } from "lucide-react";
import FilterSidebar from "./components/FilterSidebar";

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

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesJobType &&
        matchesExperienceLevel &&
        matchesSalary
      );
    })
    .map((job) => ({
      ...job,
      isSaved: savedJobIds.has(job.id),
    }));

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

            <JobList jobs={filteredJobs} onSaveJob={handleSaveJob} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
