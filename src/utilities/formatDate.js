import { format } from "date-fns";
export const longDate = (isoDateStr) => {
  if (!isoDateStr) {
    return;
  }
  const readableDate = format(new Date(isoDateStr), "MMMM d, yyyy h:mm:ss a");
  return readableDate;
};

export const shortDate = (isoDateStr) => {
  if (!isoDateStr) {
    return;
  }
  const short = format(new Date(isoDateStr), "MMM d, yyyy");
  return short;
};
