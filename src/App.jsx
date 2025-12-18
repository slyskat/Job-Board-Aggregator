import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { normalizeJobData } from "./utils/dataNormalizer";
import JobStats from "./components/JobStats";
import { useEffect, useMemo, useState } from "react";
import { fetchJobs } from "./utils/jobApi";
import JobList from "./components/JobList";
import { ChevronRight } from "lucide-react";
import FilterSidebar from "./components/FilterSidebar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorState from "./components/ErrorState";
import JobDetailsModal from "./components/JobDetailsModal";

function App() {
  const [rawJobsData, setRawJobsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [locationquery, setLocationQuery] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState(new Set());
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState(
    new Set()
  );
  const [salaryRange, setSalaryRange] = useState({ min: 0, max: 300000 });
  const [datePosted, setDatePosted] = useState("");
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);

  useEffect(function () {
    async function loadJobs() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchJobs();
        setRawJobsData(data);

        if (!data || data.length === 0) {
          setError("No jobs found. Try adjusting your search criteria.");
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadJobs();
  }, []);

  const jobs = normalizeJobData(rawJobsData);

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

  const filteredJobs = useMemo(() => {
    return jobs
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
  }, [
    jobs,
    searchQuery,
    locationquery,
    selectedJobTypes,
    selectedExperienceLevels,
    salaryRange,
    isRemoteOnly,
    datePosted,
    savedJobIds,
  ]);

  function handleJobClick(job) {
    setIsJobModalOpen(true);
    setSelectedJob(job);
  }

  function handleCloseJobModal() {
    setIsJobModalOpen(false);
    setSelectedJob(null);
  }

  function handleOpenFilters() {
    setIsFilterOpen(true);
  }

  function handleCloseFilters() {
    setIsFilterOpen(false);
  }

  function handleClearAllFilters() {
    setSelectedJobTypes(new Set());
    setSelectedExperienceLevels(new Set());
    setSalaryRange({ min: 0, max: 300000 });
    setDatePosted("");
    setIsRemoteOnly(false);
  }

  function handleRetry() {
    setError(null);
    setIsLoading(true);
    fetchJobs()
      .then((data) => {
        setRawJobsData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load jobs. Please try again later.");
        setIsLoading(false);
      });
  }

  const savedCount = savedJobIds.size;

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
            onClose={handleCloseFilters}
            onClearAll={handleClearAllFilters}
          />
          <main className="main">
            <SearchBar
              searchQuery={searchQuery}
              setLocationQuery={setLocationQuery}
              setSearchQuery={setSearchQuery}
              locationquery={locationquery}
              onOpenFilters={handleOpenFilters}
            />
            <JobStats jobs={filteredJobs} />
            <div className="breadcrumb">
              <span>Jobs</span>
              <ChevronRight className="breadcrumbIcon" />
              <span>Search Results</span>
            </div>

            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorState onRetry={handleRetry} />
            ) : (
              <JobList
                jobs={filteredJobs}
                onJobClick={handleJobClick}
                onSaveJob={handleSaveJob}
              />
            )}

            <JobDetailsModal
              isOpen={isJobModalOpen}
              onClose={handleCloseJobModal}
              job={selectedJob}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
