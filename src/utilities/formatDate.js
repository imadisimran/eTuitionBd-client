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

//format date from second

export const longDateFromS = (inSecond) => {
  if (!inSecond) {
    return;
  }
  const timestamp = inSecond;
  const date = new Date(timestamp * 1000);

  const formatted = format(date, "MMMM d, yyyy h:mm:ss a");
  return formatted;
};
