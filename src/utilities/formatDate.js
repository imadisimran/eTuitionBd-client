import { format } from "date-fns";
export const longDate = (isoDateStr) => {
  if (!isoDateStr) {
    return;
  }
  const readableDate = format(new Date(isoDateStr), "MMMM d, yyyy h:mm:ss a");
  return readableDate;
};
