export function limitTechStack(techStack, limit) {
  if (!Array.isArray(techStack)) {
    return { displayItems: [], remainingCount: 0 };
  }

  if (techStack.length <= limit) {
    return { displayItems: techStack, remainingCount: 0 };
  }

  if (techStack.length > limit) {
    const displayItems = techStack.slice(0, limit);
    const remainingCount = techStack.length - limit;
    return { displayItems, remainingCount };
  }
}

// const tech = [
//   "HTML",
//   "CSS",
//   "JS",
//   "REACT",
//   "NODE",
//   "EXPRESS",
//   "SUPABASE",
//   "MongoDB",
// ];

// const testLimit = 5;

// const testResult = limitTechStack(tech, testLimit);

// console.log(testResult);
