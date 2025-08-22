import { format } from "date-fns";

const formatPostDate = (date) => {
  return format(date, "MMMM d, y").toUpperCase();
};

export { formatPostDate };
