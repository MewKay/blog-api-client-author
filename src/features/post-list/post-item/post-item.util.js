import { differenceInYears, format, formatDistanceToNowStrict } from "date-fns";

const formatPostDate = (date) => {
  const isDateLessThanOneYearAgo = differenceInYears(new Date(), date) < 1;

  return isDateLessThanOneYearAgo
    ? formatDistanceToNowStrict(date, { addSuffix: true })
    : format(date, "'on' MMMM d, yyyy");
};

export { formatPostDate };
