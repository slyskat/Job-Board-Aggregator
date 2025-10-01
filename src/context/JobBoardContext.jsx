// import { normalizeJobData } from "../utils/dataNormalizer";
// import jobsData from "../data/jobs.json";
// import { act, createContext, useContext } from "react";
// import { useReducer } from "react";

// const initialState = {
//   jobs: normalizeJobData(jobsData),
//   filteredJobs: [],
//   isLoading: false,
//   error: null,
//   activeFilters: {
//     keyword: "",
//     experienceLevel: [],
//     minSalary: 0,
//     maxSalary: Infinity,
//     isRemote: false,
//     requiredTech: [],
//   },
//   savedJobs: [],
// };

// const SET_LOADING = "SET_LOADING";
// const SET_ERROR = "SET_ERROR";
// const SET_FILTERED_JOBS = "SET_FILTERED_JOBS";
// const SET_FILTERS = "SET_FILTERS";
// const UPDATE_FILTER = "UPDATE_FILTER";

// function jobBoardReducer(state, action) {
//   switch (action.type) {
//     case SET_LOADING:
//       return { ...state, isLoading: action.payload };
//     default:
//       throw new Error(`Unhandled action type: ${action.type}`);
//   }
// }

// const jobBoardContext = createContext();

// function JobBoardProvider({ children }) {
//   const [{ activeFilters }, dispatch] = useReducer(
//     jobBoardReducer,
//     initialState
//   );

//   function applyFilters(jobs, filters) {
//     let results = jobs;

//     if (filters.keyword) {
//       const search = filters.keyword.toLowerCase();
//     }
//   }

//   const contextValue = { activeFilters };

//   return (
//     <jobBoardContext.Provider value={contextValue}>
//       {children}
//     </jobBoardContext.Provider>
//   );
// }

// function useJobBoard() {
//   const context = useContext(jobBoardContext);
//   if (context === undefined) {
//     throw new Error("useJobBoard must be used within a JobBoardProvider");
//   }
//   return context;
// }

// export { JobBoardProvider, useJobBoard };
