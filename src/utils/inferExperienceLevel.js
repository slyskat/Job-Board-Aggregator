export default function inferExperienceLevel(title) {
  if (!title) return "entry";

  const titleLower = title.toLowerCase();

  if (
    titleLower.includes("senior") ||
    titleLower.includes("sr.") ||
    titleLower.includes("staff")
  ) {
    return "senior";
  }

  if (
    titleLower.includes("lead") ||
    titleLower.includes("principal") ||
    titleLower.includes("architect") ||
    titleLower.includes("chief")
  ) {
    return "lead";
  }

  if (
    titleLower.includes("junior") ||
    titleLower.includes("jr.") ||
    titleLower.includes("jr ") ||
    titleLower.includes("entry") ||
    titleLower.includes("intern")
  ) {
    return "entry";
  }

  return "mid";
}
