import { formatDistanceToNow } from "date-fns";

export function formatPostedDate(postedDate) {
  if (!postedDate || !(postedDate instanceof Date) || isNaN(postedDate)) {
    return "Date Unknown";
  }

  return formatDistanceToNow(postedDate, { addSuffix: true });
}

// console.log(formatPostedDate(new Date(new Date())));
