import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { normalizeJobData } from "./utils/dataNormalizer";
import JobStats from "./components/JobStats";
import { useEffect, useState } from "react";
import { fetchJobs } from "./utils/jobApi";
import JobList from "./components/JobList";
import { ChevronRight } from "lucide-react";

function App() {
  const [rawJobsData, setRawJobsData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [locationquery, setLocationQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(function () {
    async function loadJobs() {
     setError('');
      try {
    setIsLoading(true);
    const data = await fetchJobs();
    setRawJobsData(data);
} catch (err) {
 setError(err.message);
} finally {
setIsLoading(true);
}
    }

    loadJobs();
  }, []);

  const jobs = normalizeJobData(rawJobsData);


  const [savedJobIds, setSavedJobIds] = useState(new Set());

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

      return matchesKeyword && matchesLocation;
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
