export default function normalizeJobType(employmentType) {
  if (!employmentType || typeof employmentType !== "string") return "full-time";

  const type = employmentType.toLowerCase();

  if (
    type.includes("full-time") ||
    type.includes("full time") ||
    type.includes("fulltime")
  ) {
    return "full-time";
  }

  if (
    type.includes("part-time") ||
    type.includes("parttime") ||
    type.includes("parttime")
  ) {
    return "part-time";
  }

  if (type.includes("contract") || type.includes("contractor")) {
    return "contract";
  }

  if (type.includes("intern")) {
    return "internship";
  }

  return "full-time";
}
