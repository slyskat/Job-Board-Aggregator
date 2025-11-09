const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = "jsearch.p.rapidapi.com";

export async function fetchJobs(query = "React developer", location = "") {
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
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching jobs: ", error);
    return [];
  }
}
