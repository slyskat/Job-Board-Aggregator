import { MOCK_JOBS } from "../data/MockJobsData";

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = "jsearch.p.rapidapi.com";

export async function fetchJobs(query = "React developer", location = "") {
  const useMockData =
    import.meta.env.VITE_USE_MOCK_DATA === "true" || !RAPIDAPI_KEY;

  if (useMockData) {
    console.log("🔸 Using mock data (rate limit or no API key)");
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_JOBS;
  }
  const searchQuery = location ? `${query} in ${location}` : query;

  const url = `https://${RAPIDAPI_HOST}/search?query=${encodeURIComponent(
    searchQuery
  )}&page=1&num_pages=1`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": RAPIDAPI_HOST,
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 429) {
        console.warn("⚠️ Rate limit exceeded, using mock data");
        return MOCK_JOBS;
      }
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching jobs: ", error);
    console.log("🔸 Falling back to mock data due to error");
    return MOCK_JOBS;
  }
}
